import {performance} from "perf_hooks";
import {ThisWithTimings} from "./types";
export function timing() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const value = descriptor.value;
        descriptor.value = async function (...args: any[]) {
                const start = performance.now();
             const o = await value.apply(this, args);
                const end = performance.now();
                if((this as ThisWithTimings)?.__timings) {
                    (this as ThisWithTimings)?.__timings.push({
                        name: propertyKey,
                        time: end - start
                    })
                } else {
                    console.log(`Call to ${propertyKey} took ${end - start} milliseconds`);
                }
             return o;
        }
    }
}