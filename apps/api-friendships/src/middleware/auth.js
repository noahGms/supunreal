import axios from 'axios';

export const isAuth = async (req, res, next) => {
  try {
    let user;
    const response = await axios.get(process.env.API_AUTH_URL + '/whoami', {
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    user = response.data.data;

    if (!user) return res.status(401).json({error: 'unauthorized'});

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({error: 'unauthorized'});
  }
};