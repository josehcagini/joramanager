import { dirname } from 'path';
import { fileURLToPath } from 'url';

const currentdirname = dirname(fileURLToPath(import.meta.url));

export default currentdirname;
