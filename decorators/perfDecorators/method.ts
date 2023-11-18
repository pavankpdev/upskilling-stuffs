import {performance} from "perf_hooks";
import {ThisWithTimings} from "./types";
import {importantMetadataKey} from "./parameter";
export function timing() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const value = descriptor.value;
        descriptor.value = async function (...args: any[]) {
                const start = performance.now();
             const o = await value.apply(this, args);
                const end = performance.now();

                const impParams: unknown[] = []
                let requiredParameters: number[] = Reflect.getOwnMetadata(importantMetadataKey, target, propertyKey) || [];

                if(requiredParameters) {
                    for (let paramIndex of requiredParameters) {
                        impParams.push(args[paramIndex]);
                    }
                }

                if((this as ThisWithTimings)?.__timings) {
                    (this as ThisWithTimings)?.__timings.push({
                        name: propertyKey,
                        time: end - start,
                        impParams
                    })
                } else {
                    console.log(`Call to ${propertyKey} took ${end - start} milliseconds`);
                }
             return o;
        }
    }
}