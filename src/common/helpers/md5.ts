const SparkMD5 = window['SparkMD5'];

const defaultChunkSize = 4 * 1024 * 1024;

const getFileMd5 = (file: File, chunkSize: number = defaultChunkSize): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      spark.append(e.target.result as ArrayBuffer);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        const md5 = spark.end();
        resolve(md5);
      }
    };

    fileReader.onerror = (err) => reject(err);

    function loadNext() {
      const start = currentChunk * chunkSize;
      let end = start + chunkSize;
      if (end > file.size) {
        end = file.size;
      }
      fileReader.readAsArrayBuffer(File.prototype.slice.call(file, start, end));
    }
    loadNext();
  });
};

export default getFileMd5;
