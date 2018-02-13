import Syncano from 'syncano-server';
import sharp from 'sharp';
import fs from 'fs';
import {exec} from 'child_process';

export default ctx => {
  const {response} = Syncano(ctx);
  fs.writeFileSync('test.png', ctx.args.file);
  const startDate = new Date();
  sharp('test.png')
    .resize(50, 50)
    .toFile('out.png')
    .then(() => {
      console.log('done');
      console.log(new Date() - startDate);
      return response(fs.readFileSync('out.png'), 200, 'image/png');
    })
    .catch(console.log);
};
