//@ts-ignore
import * as failFast from 'jasmine-fail-fast';

//@ts-ignore
const jasmineEnv = jasmine.getEnv();

jasmineEnv.addReporter(failFast.init());

expect.extend({
    nilOrAny(received: any, expected: any) {
        const receivedType = typeof received;
        let pass = received instanceof expected;

        if (null === received || undefined === received) {
            pass = true;
        } else {
            if (Number === expected) {
                pass = 'number' === receivedType || received instanceof Number;
            } else if (String === expected) {
                pass = 'string' === receivedType || received instanceof String;
            }
        }

        return {
            message: () => `expected null or undefined or instance of ${typeof expected} 
                and received ${'object' === receivedType ? 'null' : receivedType}`,
            pass,
        };
    },
});