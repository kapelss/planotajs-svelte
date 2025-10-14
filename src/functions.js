let uzdevumi = [];

export function panemUzdevumu() {
  return uzdevumi;
}

export function pievienotUzdevumu(value) {
 if (value.trim()) {
  uzdevumi.push(value.trim());
 }
}

export function augstak(index) {
  if (index > 0) {
    [uzdevumi[index - 1], uzdevumi[index]] = [uzdevumi[index], uzdevumi[index - 1]];
  }
}

export function zemak(index) {
  if (index < uzdevumi.length - 1) {
    [uzdevumi[index + 1], uzdevumi[index]] = [uzdevumi[index], uzdevumi[index + 1]]
  }
}