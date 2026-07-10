import { WebContainer } from '@webcontainer/api';

/**
 * Singleton manager for the WebContainer instance.
 */
class WebContainerManager {
  constructor() {
    this.instance = null;
    this.bootPromise = null;
    this.isBooting = false;
  }

  /**
   * Boots the WebContainer instance. Guaranteed to only boot once.
   */
  async boot() {
    if (this.instance) return this.instance;
    if (this.bootPromise) return this.bootPromise;

    this.isBooting = true;
    this.bootPromise = WebContainer.boot().then((instance) => {
      this.instance = instance;
      this.isBooting = false;
      return instance;
    }).catch((err) => {
      this.isBooting = false;
      this.bootPromise = null;
      throw err;
    });

    return this.bootPromise;
  }

  /**
   * Converts a flat file dictionary ({ "src/App.jsx": "code..." }) 
   * to the nested FileSystemTree required by WebContainers.
   */
  _buildFileSystemTree(files) {
    const tree = {};
    for (const [path, content] of Object.entries(files)) {
      // Remove leading slash if present
      const cleanPath = path.startsWith('/') ? path.slice(1) : path;
      const parts = cleanPath.split('/');
      let currentLevel = tree;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          // It's a file
          currentLevel[part] = {
            file: {
              contents: typeof content === 'object' ? JSON.stringify(content, null, 2) : content
            }
          };
        } else {
          // It's a directory
          if (!currentLevel[part]) {
            currentLevel[part] = { directory: {} };
          }
          currentLevel = currentLevel[part].directory;
        }
      }
    }
    return tree;
  }

  /**
   * Mounts the given files into the WebContainer.
   */
  async mountFiles(files) {
    const instance = await this.boot();
    const tree = this._buildFileSystemTree(files);
    await instance.mount(tree);
  }

  /**
   * Spawns a command inside the WebContainer and optionally pipes output to a terminal.
   * @param {string} cmd 
   * @param {string[]} args 
   * @param {function} onOutput 
   */
  async runCommand(cmd, args, onOutput) {
    const instance = await this.boot();
    const process = await instance.spawn(cmd, args);
    
    if (onOutput) {
      process.output.pipeTo(new WritableStream({
        write(data) {
          onOutput(data);
        }
      }));
    }
    
    return process.exit;
  }

  /**
   * Writes a single file to the WebContainer FS.
   */
  async writeFile(path, content) {
    const instance = await this.boot();
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Ensure parent directories exist
    const parts = cleanPath.split('/');
    if (parts.length > 1) {
      const dir = parts.slice(0, -1).join('/');
      try {
        await instance.fs.mkdir(dir, { recursive: true });
      } catch () {
        // Ignore if exists
      }
    }

    await instance.fs.writeFile(cleanPath, content);
  }

  /**
   * Deletes a file from the WebContainer FS.
   */
  async deleteFile(path) {
    const instance = await this.boot();
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    await instance.fs.rm(cleanPath, { recursive: true });
  }

  /**
   * Listens to the server-ready event emitted by dev servers (like Vite).
   */
  async onServerReady(callback) {
    const instance = await this.boot();
    instance.on('server-ready', callback);
  }
}

export const webcontainerManager = new WebContainerManager();
