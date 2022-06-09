const MOCK_SYMBOL = Symbol.for("@MOCK");

export type MockCall = {
  args: any[];
  returned?: any;
  thrown?: any;
  timestamp: number;
  returns: boolean;
  throws: boolean;
};

export function fn(...stubs: Function[]) {
  const calls: MockCall[] = [];

  const f = (...args: any[]) => {
    const stub = stubs.length === 1
      ? // keep reusing the first
        stubs[0]
      : // pick the exact mock for the current call
        stubs[calls.length];

    try {
      const returned = stub ? stub(...args) : undefined;
      calls.push({
        args,
        returned,
        timestamp: Date.now(),
        returns: true,
        throws: false,
      });
      return returned;
    } catch (err) {
      calls.push({
        args,
        timestamp: Date.now(),
        returns: false,
        thrown: err,
        throws: true,
      });
      throw err;
    }
  };

  Object.defineProperty(f, MOCK_SYMBOL, {
    value: { calls },
    writable: false,
  });

  return f;
}

export function calls(f: Function): MockCall[] {
  const mockInfo = (f as any)[MOCK_SYMBOL];
  if (!mockInfo) throw new Error("callCount only available on mock functions");

  return [...mockInfo.calls];
}
