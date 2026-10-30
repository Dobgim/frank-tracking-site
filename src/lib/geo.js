const rad = (deg) => (deg * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

function toVector({ lat, lng }) {
  return [Math.cos(rad(lat)) * Math.cos(rad(lng)), Math.cos(rad(lat)) * Math.sin(rad(lng)), Math.sin(rad(lat))];
}

// Point a given fraction of the way along the shortest route between two places.
export function pointAlong(a, b, fraction) {
  const [ax, ay, az] = toVector(a);
  const [bx, by, bz] = toVector(b);
  const angle = Math.acos(Math.min(1, ax * bx + ay * by + az * bz));
  if (angle === 0) return [a.lat, a.lng];
  const p = Math.sin((1 - fraction) * angle) / Math.sin(angle);
  const q = Math.sin(fraction * angle) / Math.sin(angle);
  const [x, y, z] = [p * ax + q * bx, p * ay + q * by, p * az + q * bz];
  return [deg(Math.atan2(z, Math.hypot(x, y))), deg(Math.atan2(y, x))];
}

// Longitudes continue past ±180 so routes crossing the date line draw unbroken.
export function routePoints(a, b, fromFraction = 0, toFraction = 1, steps = 64) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const [lat, lng] = pointAlong(a, b, fromFraction + ((toFraction - fromFraction) * i) / steps);
    const previous = i ? points[i - 1][1] : a.lng;
    points.push([lat, lng + 360 * Math.round((previous - lng) / 360)]);
  }
  return points;
}
