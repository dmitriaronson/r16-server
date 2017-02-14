import Joi from 'joi';

const playlist = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string(),
  tracks: Joi.array().min(1).required().items(Joi.object()),
});

export function validatePlaylist(body) {
  return new Promise((resolve, reject) => {
    Joi.validate(body, playlist, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}
