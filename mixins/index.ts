function myLogFunction() {
  return (str: string) => {
    console.log(str);
  }
}

const logger = myLogFunction();
logger('test');


function createLoggerClass() {
    return class MyLoggerClass {
        private completeLog: string = '';
        log(str: string) {
            console.log(str);
            this.completeLog += str + '\n';
        }
        dumpLog() {
            return this.completeLog;
        }
    }
}

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();
logger2.log("YOOOOO")
console.log(logger2.dumpLog());

function createSimpleMemoryDatabase<T> () {
    return class SimpleMemoryDatabase {
        private db: Record<string, T> = {};

        set(id: string, value: T) {
            this.db[id] = value;
        }

        get (id: string): T {
            return this.db[id];
        }

        getObject(): object {
            return this.db;
        }
    }
}

const StringDatabase = createSimpleMemoryDatabase<string>();
const sbd1 = new StringDatabase();
sbd1.set('a', 'hello');
console.log(sbd1.getObject());

type Constructor<T> = new (...args: any[]) => T;
type BaseConstructorBody = {
    getObject(): object;
}

function Dumpable<T extends Constructor<BaseConstructorBody>>(Base: T) {
    return class Dumpable extends Base {
        dump() {
            console.log(this.getObject());
        }
    }
}
const DumpableStringDatabase = Dumpable(StringDatabase);
const sbd2 = new DumpableStringDatabase();
sbd2.set('kp', 'kp');
sbd2.dump();
