import Users from '../models/user.model.js';
import { UserStatus } from '../models/enums/users.enum.js';

export const addUser = async (req, res) => {
  delete req.body.password_confirmation;

  try {
    const [ user, created ] = await Users.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        ...req.body
      }
    });

    if (created) {
      const message = req.originalUrl === '/auth/sign-up' ? 'Signup Complete.' : 'User successfully added.';
      const data = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        status: user.status,
        created_at: user.created_at
      };

      return res.status(201).json({ message, data });
    } else return res.status(409).json({ message: "Email address is already registered." });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const updateUser = async (req, res) => {
  try {
    const update_user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    };

    if (req.body.password) update_user.password = req.body.password;

    await Users.update(update_user, {
      where: {
        id: req.user_id,
        status: UserStatus.ACTIVE,
      },
    });

    return res.status(200).json({ message: "User successfully updated." });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

export const deactivateUser = async (req, res) => {
  try {
    await Users.update({
      status: UserStatus.INACTIVE,
    }, {
      where: { id: req.user_id },
    });

    return res.status(200).json({ message: "User successfully deactivated." });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}