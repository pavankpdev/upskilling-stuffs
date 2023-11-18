import {performance} from "perf_hooks";
export function timing() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const value = descriptor.value;
        descriptor.value = async function (...args: any[]) {
                const start = performance.now();
             const o = await value.apply(this, args);
                const end = performance.now();
                console.log(`Call to ${propertyKey} took ${end - start} milliseconds`);
             return o;
        }
    }
}