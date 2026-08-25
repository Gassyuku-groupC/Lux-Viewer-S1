import MainScene, { FrameSingleCityTileData } from '../MainScene';
import {
  getDepthByPos,
  getNightTransitionTween,
  mapPosToIsometricPixels,
} from '../utils';

export const addCityTile = (
  scene: MainScene,
  data: FrameSingleCityTileData,
  tilesWithUnits: Set<number>,
  turn = 0,
  roleAssetKey?: string
) => {
  const p = mapPosToIsometricPixels(data.pos, {
    scale: scene.overallScale,
    width: scene.mapWidth,
    height: scene.mapHeight,
  });
  const variant = '0';
  const cityTileType = 'city' + data.team + variant;

  let dayTextureKey = cityTileType;
  let nightTextureKey = cityTileType + 'night';
  if (roleAssetKey) {
    const roleDayKey = `${cityTileType}-${roleAssetKey}`;
    const roleNightKey = `${cityTileType}night-${roleAssetKey}`;
    if (scene.textures.exists(roleDayKey)) {
      dayTextureKey = roleDayKey;
    }
    if (scene.textures.exists(roleNightKey)) {
      nightTextureKey = roleNightKey;
    }
  }

  // handle determining alpha for night version

  let [startAlpha, endAlpha] = scene.determineNightTransitionAlphas(turn);

  const img = scene.add
    .image(p[0], p[1], dayTextureKey)
    .setDepth(getDepthByPos(data.pos))
    .setScale(scene.defaultScales.city * scene.overallScale);
  let ny = img.y;
  let nx = img.x;
  const img_overlay = scene.add
    .image(p[0], p[1], nightTextureKey)
    .setDepth(getDepthByPos(data.pos) + 1e-1)
    .setScale(scene.defaultScales.city * scene.overallScale)
    .setAlpha(startAlpha);
  scene.tweens.add(getNightTransitionTween(img_overlay, scene.speed, endAlpha));

  switch (data.team) {
    case 0:
      ny = img.y - 80 * scene.defaultScales.city * scene.overallScale;
      nx = img.x + 10 * scene.defaultScales.city * scene.overallScale;
      break;
    case 1:
      ny = img.y - 100 * scene.defaultScales.city * scene.overallScale;
      break;
  }
  img.setY(ny);
  img.setX(nx);
  img_overlay.setY(ny);
  img_overlay.setX(nx);

  return [img, img_overlay];
};
