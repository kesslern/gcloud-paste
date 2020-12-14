const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('pastes.pokecenter.xyz');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
    let file = bucket.file('testfile.html');
    file.save('test 123 ' + message,
        ((error) => {
            error ? reject(error) : resolve()
        })
    );

  let message = req.query.message || req.body.message || 'Hello World!';
  res.status(200).send(message);
};
