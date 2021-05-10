declare module "bfile/lib/error" {
    /**
     * ArgError
     */
    export class ArgError extends TypeError {
        constructor(name: any, value: any, expect: any);
        code: string;
    }
    /**
     * FSError
     */
    export class FSError extends Error {
        constructor(desc: any, ...args: any[]);
        code: any;
        errno: any;
        syscall: any;
        path: any;
    }
    export namespace FSError {
        namespace EPERM {
            const code: string;
            const errno: number;
            const message: string;
        }
        namespace ENOENT {
            const code_1: string;
            export { code_1 as code };
            const errno_1: number;
            export { errno_1 as errno };
            const message_1: string;
            export { message_1 as message };
        }
        namespace EIO {
            const code_2: string;
            export { code_2 as code };
            const errno_2: number;
            export { errno_2 as errno };
            const message_2: string;
            export { message_2 as message };
        }
        namespace EBADF {
            const code_3: string;
            export { code_3 as code };
            const errno_3: number;
            export { errno_3 as errno };
            const message_3: string;
            export { message_3 as message };
        }
        namespace EACCES {
            const code_4: string;
            export { code_4 as code };
            const errno_4: number;
            export { errno_4 as errno };
            const message_4: string;
            export { message_4 as message };
        }
        namespace EEXIST {
            const code_5: string;
            export { code_5 as code };
            const errno_5: number;
            export { errno_5 as errno };
            const message_5: string;
            export { message_5 as message };
        }
        namespace ENOTDIR {
            const code_6: string;
            export { code_6 as code };
            const errno_6: number;
            export { errno_6 as errno };
            const message_6: string;
            export { message_6 as message };
        }
        namespace EISDIR {
            const code_7: string;
            export { code_7 as code };
            const errno_7: number;
            export { errno_7 as errno };
            const message_7: string;
            export { message_7 as message };
        }
    }
}
declare module "bfile/lib/util" {
    export function call(func: any, args: any): any;
    export function promisify(func: any): (...args: any[]) => any;
    export function isPath(path: any): any;
    export function fromPath(path: any): any;
    export function fromPaths(paths: any): any[];
    export function toBuffer(data: any): any;
}
declare module "bfile/lib/extra" {
    export function copy(src: any, dest: any, options: any): Promise<number>;
    export function copySync(src: any, dest: any, options: any): number;
    export function empty(path: any, mode: any): Promise<any>;
    export function emptySync(path: any, mode: any): any;
    export function exists(file: any, mode: any): Promise<boolean>;
    export function existsSync(file: any, mode: any): boolean;
    export function lstatTry(...args: any[]): Promise<any>;
    export function lstatTrySync(...args: any[]): any;
    export function mkdirp(dir: any, mode: any): Promise<any>;
    export function mkdirpSync(dir: any, mode: any): any;
    export function move(src: any, dest: any): Promise<void>;
    export function moveSync(src: any, dest: any): void;
    export function outputFile(path: any, data: any, options: any): Promise<void>;
    export function outputFileSync(path: any, data: any, options: any): void;
    export function readJSON(path: any, options: any): Promise<any>;
    export function readJSONSync(path: any, options: any): any;
    export function removeSync(paths: any, options: any): number;
    export function remove(paths: any, options: any): Promise<number>;
    export function statTry(...args: any[]): Promise<any>;
    export function statTrySync(...args: any[]): any;
    export function stats(file: any, options: any): Promise<any>;
    export function statsSync(file: any, options: any): any;
    export function statsTry(file: any, options: any): Promise<any>;
    export function statsTrySync(file: any, options: any): any;
    export function traverse(paths: any, options: any, cb: any): Promise<void>;
    export function traverseSync(paths: any, options: any, cb: any): void;
    export function walk(paths: any, options: any): AsyncWalker;
    export function walkSync(paths: any, options: any): {};
    export function writeJSON(path: any, json: any, options: any): Promise<any>;
    export function writeJSONSync(path: any, json: any, options: any): void;
    /**
     * AsyncWalker
     */
    class AsyncWalker {
        constructor(paths: any, options: any);
        stack: any[];
        dirs: any;
        files: any;
        filter: any;
        follow: any;
        maxDepth: any;
        stats: any;
        statter: typeof stats;
        seen: any;
        depth: number;
        push(items: any): void;
        pop(): any;
        read(path: any, dir: any, depth: any): Promise<void>;
        next(): any;
    }
    export {};
}
declare module "bfile/lib/compat" {
    export const COPYFILE_EXCL: number;
    export const COPYFILE_FICLONE: number;
    export const COPYFILE_FICLONE_FORCE: number;
    export function copyFile(src: any, dest: any, flags: any): Promise<any>;
    export function copyFileSync(src: any, dest: any, flags: any): void;
    export function mkdir(path: any, options: any): Promise<any>;
    export function mkdirSync(path: any, options: any): any;
    export function open(...args: any[]): Promise<any>;
    export function openSync(...args: any[]): any;
    export function read(...args: any[]): Promise<any>;
    export function readSync(...args: any[]): any;
    export function readdir(...args: any[]): Promise<any>;
    export function readdirSync(...args: any[]): any;
    /**
     * Dirent
     */
    export class Dirent {
        constructor(name: any, stat: any);
        name: any;
        stat: any;
        isBlockDevice(): any;
        isCharacterDevice(): any;
        isDirectory(): any;
        isFIFO(): any;
        isFile(): any;
        isSocket(): any;
        isSymbolicLink(): any;
    }
    export function opendir(path: any, options: any): Promise<Dir>;
    export function opendirSync(path: any, options: any): Dir;
    /**
     * Dir
     */
    export class Dir {
        constructor(path: any, list: any);
        path: any;
        _list: any;
        _index: number;
        _error(): Error;
        close(callback: any): Promise<void>;
        closeSync(): void;
        read(callback: any): Promise<any>;
        readSync(): any;
        entries(): {
            next: () => Promise<{
                value: any;
                done: boolean;
            }>;
        };
    }
    export function realpath(...args: any[]): any;
    export namespace realpath {
        function native(...args: any[]): Promise<any>;
    }
    export function realpathSync(...args: any[]): any;
    export namespace realpathSync {
        function native(...args: any[]): any;
    }
    export function rmdir(path: any, options: any): Promise<any>;
    export function rmdirSync(path: any, options: any): void;
    export function fstat(file: any, options: any): Promise<any>;
    export function fstatSync(file: any, options: any): any;
    export function stat(file: any, options: any): Promise<any>;
    export function statSync(file: any, options: any): any;
    export function lstat(file: any, options: any): Promise<any>;
    export function lstatSync(file: any, options: any): any;
    export function write(...args: any[]): Promise<any>;
    export function writeSync(...args: any[]): any;
    export function writeFile(...args: any[]): Promise<any>;
    export function writeFileSync(...args: any[]): any;
    export function writev(fd: any, buffers: any, position: any): Promise<number>;
    export function writevSync(fd: any, buffers: any, position: any): number;
    export namespace promises {
        export const access: (...args: any[]) => any;
        export const appendFile: (...args: any[]) => any;
        export const chmod: (...args: any[]) => any;
        export const chown: (...args: any[]) => any;
        export { copyFile };
        export const lchmod: (...args: any[]) => any;
        export const lchown: (...args: any[]) => any;
        export const link: (...args: any[]) => any;
        export { lstat };
        export { mkdir };
        export const mkdtemp: (...args: any[]) => any;
        export function open(...args: any[]): Promise<FileHandle>;
        export { opendir };
        export { readdir };
        export const readFile: (...args: any[]) => any;
        export const readlink: (...args: any[]) => any;
        export { realpath };
        export const rename: (...args: any[]) => any;
        export { rmdir };
        export { stat };
        export const symlink: (...args: any[]) => any;
        export const truncate: (...args: any[]) => any;
        export const unlink: (...args: any[]) => any;
        export const utimes: (...args: any[]) => any;
        export { writeFile };
    }
    export function clonePromises(promises: any): {
        access: any;
        appendFile: any;
        chmod: any;
        chown: any;
        copyFile: any;
        lchmod: any;
        lchown: any;
        link: any;
        lstat: any;
        mkdir: any;
        mkdtemp: any;
        open: any;
        opendir: any;
        readdir: any;
        readFile: any;
        readlink: any;
        realpath: any;
        rename: any;
        rmdir: any;
        stat: any;
        symlink: any;
        truncate: any;
        unlink: any;
        utimes: any;
        writeFile: any;
    };
    export function patchStat(promises: any): void;
    export function patchTypedArray(promises: any): void;
    export function patchOpenFlags(promises: any): void;
    export function patchWritev(promises: any): void;
    /**
     * FileHandle
     */
    class FileHandle {
        constructor(fd: any);
        _fd: any;
        getAsyncId(): number;
        get fd(): any;
        appendFile(...args: any[]): any;
        chmod(...args: any[]): any;
        chown(...args: any[]): any;
        close(): any;
        datasync(): any;
        read(...args: any[]): Promise<{
            bytesRead: any;
            buffer: any;
        }>;
        readFile(...args: any[]): any;
        stat(...args: any[]): Promise<any>;
        sync(): any;
        truncate(...args: any[]): any;
        utimes(...args: any[]): any;
        write(...args: any[]): Promise<{
            bytesWritten: any;
            buffer: any;
        }>;
        writeFile(...args: any[]): Promise<any>;
        writev(...args: any[]): Promise<{
            bytesWritten: number;
            buffers: any;
        }>;
    }
    export {};
}
declare module "bfile/lib/fs" {
    export = fs;
    import fs = require("bfile/lib/backend");
}
declare module "bfile/lib/features" {
    const version: number;
    export let HAS_STAT_NUMBERS: boolean;
    export let HAS_COPY_FILE: boolean;
    export let HAS_COPY_FILE_IMPL: boolean;
    export let HAS_REALPATH_NATIVE: boolean;
    export let HAS_REALPATH_NATIVE_IMPL: boolean;
    export let HAS_RW_READY: boolean;
    export let HAS_WATCHER_CLOSE: boolean;
    export let HAS_PROMISES: boolean;
    export let HAS_PROMISES_IMPL: any;
    export let HAS_STAT_BIGINTS: boolean;
    export let HAS_DEPRECATED_LCHOWN: boolean;
    export let HAS_DIRENT: boolean;
    export let HAS_DIRENT_IMPL: boolean;
    export let HAS_RW_TYPED_ARRAY: boolean;
    export let HAS_RECURSIVE_MKDIR: boolean;
    export let HAS_OPTIONAL_FLAGS: boolean;
    export let HAS_WRITE_PENDING: boolean;
    export let HAS_STABLE_PROMISES: boolean;
    export let USE_STABLE_PROMISES: boolean;
    export let HAS_WRITEV: boolean;
    export let HAS_WRITEV_IMPL: boolean;
    export let HAS_STAT_NANO: boolean;
    export let HAS_RECURSIVE_RMDIR: boolean;
    export let HAS_OPENDIR: boolean;
    export let HAS_OPENDIR_IMPL: boolean;
    export let HAS_ALL: boolean;
    export { version as VERSION };
}
declare module "bfile/lib/modern" {
    export var access: (...args: any[]) => any;
    export var appendFile: (...args: any[]) => any;
    export var chmod: (...args: any[]) => any;
    export var chown: (...args: any[]) => any;
    export var close: (...args: any[]) => any;
    export var copyFile: (...args: any[]) => any;
    export function exists(file: any): any;
    export var fchmod: (...args: any[]) => any;
    export var fchown: (...args: any[]) => any;
    export var fdatasync: (...args: any[]) => any;
    export var fstat: (...args: any[]) => any;
    export var fsync: (...args: any[]) => any;
    export var ftruncate: (...args: any[]) => any;
    export var futimes: (...args: any[]) => any;
    export var lchmod: (...args: any[]) => any;
    export var lchown: (...args: any[]) => any;
    export var link: (...args: any[]) => any;
    export var lstat: (...args: any[]) => any;
    export var mkdir: (...args: any[]) => any;
    export var mkdtemp: (...args: any[]) => any;
    export var open: (...args: any[]) => any;
    export var opendir: (...args: any[]) => any;
    export function read(fd: any, buffer: any, offset: any, length: any, position: any): any;
    export var readdir: (...args: any[]) => any;
    export var readFile: (...args: any[]) => any;
    export var readlink: (...args: any[]) => any;
    export var realpath: (...args: any[]) => any;
    export var rename: (...args: any[]) => any;
    export var rmdir: (...args: any[]) => any;
    export var stat: (...args: any[]) => any;
    export var symlink: (...args: any[]) => any;
    export var truncate: (...args: any[]) => any;
    export var unlink: (...args: any[]) => any;
    export var utimes: (...args: any[]) => any;
    export function write(fd: any, buffer: any, offset: any, length: any, position: any): any;
    export var writeFile: (...args: any[]) => any;
    export var writev: (...args: any[]) => any;
    export var F_OK: any;
    export var R_OK: any;
    export var W_OK: any;
    export var X_OK: any;
}
declare module "bfile/lib/legacy" {
    export = fs;
    import fs = require("bfile/lib/modern");
}
declare module "bfile/lib/backend" {
    const _exports: any;
    export = _exports;
}

declare module "bfile/lib/bfile" {
    const _exports: any;
    export = _exports;
}
declare module "bfile" {
    export = require("bfile/lib/bfile")
}

declare module "bfile/lib/fs-browser" {
    export function access(path: any): Promise<never>;
    export function accessSync(path: any): never;
    export function appendFile(path: any): Promise<never>;
    export function appendFileSync(path: any): never;
    export function close(): Promise<never>;
    export function closeSync(): never;
    export function createReadStream(): {
        emit: typeof noopSync;
        on: (event: any, handler: any) => void;
        once: (event: any, handler: any) => void;
        addListener: (event: any, handler: any) => void;
        off: typeof noopSync;
        removeListener: typeof noopSync;
        removeAllListeners: typeof noopSync;
        listeners: () => any[];
        listenerCount: () => number;
        readable: boolean;
        writable: boolean;
        pipe: (path: any) => never;
        write: typeof noopSync;
        end: typeof noopSync;
        close: typeof noopSync;
        destroy: typeof noopSync;
    };
    export function createWriteStream(): {
        emit: typeof noopSync;
        on: typeof noopSync;
        once: typeof noopSync;
        addListener: typeof noopSync;
        off: typeof noopSync;
        removeListener: typeof noopSync;
        removeAllListeners: typeof noopSync;
        listeners: () => any[];
        listenerCount: () => number;
        readable: boolean;
        writable: boolean;
        write: () => boolean;
        end: () => boolean;
        close: typeof noopSync;
        destroy: typeof noopSync;
    };
    export function exists(): Promise<boolean>;
    export function existsSync(): boolean;
    export function fchmod(): Promise<never>;
    export function fchmodSync(): never;
    export function fchown(): Promise<never>;
    export function fchownSync(): never;
    export function fdatasync(): Promise<never>;
    export function fdatasyncSync(): never;
    export function fstat(): Promise<never>;
    export function fstatSync(): never;
    export function fsync(): Promise<never>;
    export function fsyncSync(): never;
    export function ftruncate(): Promise<never>;
    export function ftruncateSync(): never;
    export function futimes(): Promise<never>;
    export function futimesSync(): never;
    export function lstat(path: any): Promise<never>;
    export function lstatSync(path: any): never;
    export function mkdtemp(): Promise<string>;
    export function mkdtempSync(): string;
    export function open(path: any): Promise<never>;
    export function openSync(path: any): never;
    export function opendir(path: any): Promise<never>;
    export function opendirSync(path: any): never;
    export function read(): Promise<never>;
    export function readSync(): never;
    export function readdir(path: any): Promise<never>;
    export function readdirSync(path: any): never;
    export function readFile(path: any): Promise<never>;
    export function readFileSync(path: any): never;
    export function readlink(path: any): Promise<never>;
    export function readlinkSync(path: any): never;
    export function realpath(path: any): Promise<never>;
    export namespace realpath {
        function native(path: any): Promise<never>;
    }
    export function realpathSync(path: any): never;
    export namespace realpathSync {
        export function native_1(path: any): never;
        export { native_1 as native };
    }
    export function stat(path: any): Promise<never>;
    export function statSync(path: any): never;
    export function watch(): {
        emit: typeof noopSync;
        on: (event: any, handler: any) => void;
        once: (event: any, handler: any) => void;
        addListener: (event: any, handler: any) => void;
        off: typeof noopSync;
        removeListener: typeof noopSync;
        removeAllListeners: typeof noopSync;
        listeners: () => any[];
        listenerCount: () => number;
        readable: boolean;
        writable: boolean;
        pipe: (path: any) => never;
        write: typeof noopSync;
        end: typeof noopSync;
        close: typeof noopSync;
        destroy: typeof noopSync;
    };
    export function write(): Promise<never>;
    export function writeSync(): never;
    export function writev(): Promise<never>;
    export function writevSync(): never;
    export var F_OK: number;
    export var R_OK: number;
    export var W_OK: number;
    export var X_OK: number;
    export function lstatTry(): any;
    export function lstatTrySync(): Promise<any>;
    export function readJSON(path: any): Promise<never>;
    export function readJSONSync(path: any): never;
    export function statTry(): Promise<any>;
    export function statTrySync(): any;
    export function stats(path: any): Promise<never>;
    export function statsSync(path: any): never;
    export function statsTry(): Promise<any>;
    export function statsTrySync(): any;
    export function traverse(): Promise<any>;
    export function traverseSync(): any;
    export function walk(): any[];
    export function walkSync(): any[];
    export namespace features {
        const VERSION: number;
        const HAS_STAT_NUMBERS: boolean;
        const HAS_COPY_FILE: boolean;
        const HAS_COPY_FILE_IMPL: boolean;
        const HAS_REALPATH_NATIVE: boolean;
        const HAS_REALPATH_NATIVE_IMPL: boolean;
        const HAS_RW_READY: boolean;
        const HAS_WATCHER_CLOSE: boolean;
        const HAS_PROMISES: boolean;
        const HAS_PROMISES_IMPL: boolean;
        const HAS_STAT_BIGINTS: boolean;
        const HAS_DEPRECATED_LCHOWN: boolean;
        const HAS_DIRENT: boolean;
        const HAS_DIRENT_IMPL: boolean;
        const HAS_RW_TYPED_ARRAY: boolean;
        const HAS_RECURSIVE_MKDIR: boolean;
        const HAS_OPTIONAL_FLAGS: boolean;
        const HAS_WRITE_PENDING: boolean;
        const HAS_STABLE_PROMISES: boolean;
        const USE_STABLE_PROMISES: boolean;
        const HAS_WRITEV: boolean;
        const HAS_WRITEV_IMPL: boolean;
        const HAS_STAT_NANO: boolean;
        const HAS_RECURSIVE_RMDIR: boolean;
        const HAS_OPENDIR: boolean;
        const HAS_OPENDIR_IMPL: boolean;
        const HAS_ALL: boolean;
    }
    export var unsupported: boolean;
    function noop(): Promise<void>;
    function noopSync(): void;
    export namespace constants {
        const UV_FS_SYMLINK_DIR: number;
        const UV_FS_SYMLINK_JUNCTION: number;
        const O_RDONLY: number;
        const O_WRONLY: number;
        const O_RDWR: number;
        const UV_DIRENT_UNKNOWN: number;
        const UV_DIRENT_FILE: number;
        const UV_DIRENT_DIR: number;
        const UV_DIRENT_LINK: number;
        const UV_DIRENT_FIFO: number;
        const UV_DIRENT_SOCKET: number;
        const UV_DIRENT_CHAR: number;
        const UV_DIRENT_BLOCK: number;
        const S_IFMT: number;
        const S_IFREG: number;
        const S_IFDIR: number;
        const S_IFCHR: number;
        const S_IFBLK: number;
        const S_IFIFO: number;
        const S_IFLNK: number;
        const S_IFSOCK: number;
        const O_CREAT: number;
        const O_EXCL: number;
        const O_NOCTTY: number;
        const O_TRUNC: number;
        const O_APPEND: number;
        const O_DIRECTORY: number;
        const O_NOATIME: number;
        const O_NOFOLLOW: number;
        const O_SYNC: number;
        const O_DSYNC: number;
        const O_DIRECT: number;
        const O_NONBLOCK: number;
        const S_IRWXU: number;
        const S_IRUSR: number;
        const S_IWUSR: number;
        const S_IXUSR: number;
        const S_IRWXG: number;
        const S_IRGRP: number;
        const S_IWGRP: number;
        const S_IXGRP: number;
        const S_IRWXO: number;
        const S_IROTH: number;
        const S_IWOTH: number;
        const S_IXOTH: number;
        const F_OK: number;
        const R_OK: number;
        const W_OK: number;
        const X_OK: number;
        const UV_FS_COPYFILE_EXCL: number;
        const COPYFILE_EXCL: number;
        const UV_FS_COPYFILE_FICLONE: number;
        const COPYFILE_FICLONE: number;
        const UV_FS_COPYFILE_FICLONE_FORCE: number;
        const COPYFILE_FICLONE_FORCE: number;
    }
    export class Dir {
    }
    export class Dirent {
    }
    export class Stats {
    }
    export class ReadStream {
    }
    export class WriteStream {
    }
    export class FileReadStream {
    }
    export class FileWriteStream {
    }
    namespace __E__Projects_bcoin_types_bfile_lib_fs_browser_ { }
    export { noop as chmod, noopSync as chmodSync, noop as chown, noopSync as chownSync, noop as copyFile, noopSync as copyFileSync, noop as lchmod, noopSync as lchmodSync, noop as lchown, noopSync as lchownSync, noop as link, noopSync as linkSync, noop as mkdir, noopSync as mkdirSync, noop as rename, noopSync as renameSync, noop as rmdir, noopSync as rmdirSync, noop as symlink, noopSync as symlinkSync, noop as truncate, noopSync as truncateSync, noop as unlink, noopSync as unlinkSync, noopSync as unwatchFile, noop as utimes, noopSync as utimesSync, noopSync as watchFile, noop as writeFile, noopSync as writeFileSync, __E__Projects_bcoin_types_bfile_lib_fs_browser_ as promises, noop as copy, noopSync as copySync, noop as empty, noopSync as emptySync, noop as mkdirp, noopSync as mkdirpSync, noop as move, noopSync as moveSync, noop as outputFile, noopSync as outputFileSync, noop as remove, noopSync as removeSync, noop as rimraf, noopSync as rimrafSync, noop as writeJSON, noopSync as writeJSONSync, open as handle };
}
