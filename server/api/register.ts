import bcrypt from 'bcrypt';
import { User } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
 const body = await readBody(event);
 const { _id, firstName, lastName, email, password } = body;

 // Проверяем, существует ли пользователь с таким же email
 const existingUser = await User.findOne({ email });

 if (existingUser) {
  throw createError({ statusCode: 400, message: "Данный пользователь уже зарегистрирован" });
 }

 const hashedPassword = await bcrypt.hash(password, 10);

 const newUser = new User({ firstName, lastName, email, password: hashedPassword });

 try {
  await newUser.save();
  return {
   message: "Пользователь успешно зарегистрирован",
   user: {
    _id: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
   }
  };
 } catch (error) {
  if (error === 11000) {
   throw createError({ statusCode: 400, message: "Данный пользователь уже существует" });
  }
  // Обработка других ошибок
  throw createError({ statusCode: 500, message: "Произошла ошибка при регистрации" });
 }
});