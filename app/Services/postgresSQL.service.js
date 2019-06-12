const { Pool, Client } = require('pg');

const testConection = (configuration) => {
  const { host, port, nameBD, userName, password } = configuration
  const connectionString = 'postgresql://'+userName+':'+password+'@'+host+':'+port+'/'+nameBD;  
  const pool = new Pool({
    connectionString: connectionString,
  })

  return pool.query('select * from problemtable')
    .then(response => {
      console.log(response.rows);
      pool.end();
      return true;
    })
    .catch(err => {
      console.error(err);
      pool.end();
      return false;
    });
}

// const pool = new Pool({
//   connectionString: connectionString,
// })

// pool.query('select * from problemtable where problemnumber = 1 ', (err, res) => {
//    var problem = res.rows[0];
//    console.log(problem); 
//    pool.end()
// })

// const client = new Client({
//   connectionString: connectionString,
// })
// client.connect()

// client.query('select * from problemtable', (err, res) => {
//   console.log('hola');
//   client.end()
// })
// const pgp = require('pg-promise')();
// const {LargeObjectManager} = require('pg-large-object');
// const {createWriteStream} = require('fs');

// const db = pgp('postgresql://bocauser:boca@192.168.247.173:5432/bocadb');

// // When working with Large Objects, always use a transaction
// db.tx(tx => {
//   const man = new LargeObjectManager({pgPromise: tx});

//   // A LargeObject oid, probably stored somewhere in one of your own tables.
//   const oid = 16617;

//   // If you are on a high latency connection and working with
//   // large LargeObjects, you should increase the buffer size.
//   // The buffer should be divisible by 2048 for best performance
//   // (2048 is the default page size in PostgreSQL, see LOBLKSIZE)
//   const bufferSize = 16384;

//   return man.openAndReadableStreamAsync(oid, bufferSize)
//   .then(([size, stream]) => {
//     console.log('Streaming a large object with a total size of', size);

//     // Store it as an image
//     const fileStream = createWriteStream('is-a.zip');
//     stream.pipe(fileStream);

//     return new Promise((resolve, reject) => {
//       stream.on('end', resolve);
//       stream.on('error', reject);
//     });
//   });
// })
// .then(() => {
//   console.log('Done!');
// })
// .catch(error => {
//   console.log('Something went horribly wrong!', error);
// });

module.exports = {
  testConection: testConection
}