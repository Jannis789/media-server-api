const allowAnonymousEndpoints = new Set<string>();

export function AllowAnonymous() {
  return function (target: Object, propertyKey: string) {
    const className = target.constructor.name;
    const key = `${className}.${propertyKey}`;
    allowAnonymousEndpoints.add(key);
  };
}

export { allowAnonymousEndpoints };
