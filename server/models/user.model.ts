import mongoose from "mongoose";
import {UserSchema} from "~/types/User";

const scoreSchema = new mongoose.Schema({
    firstCourse: {
        type: Map,
        of: [Number],
        default: {},
    },
    secondCourse: {
        type: Map,
        of: [Number],
        default: {},
    },
    thirdCourse: {
        type: Map,
        of: [Number],
        default: {},
    },
    fourthCourse: {
        type: Map,
        of: [Number],
        default: {},
    },
    fifthCourse: {
        type: Map,
        of: [Number],
        default: {},
    }
}, { _id: false });

const userSchema = new mongoose.Schema<UserSchema>({
    firstName: {
        type: String,
        required: [true, 'Имя - обязательное поле.'],
        trim: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value); // Исправлено на \s для пробела
            },
            message: 'Неправильно набрано имя',
        },
    },
    lastName: {
        type: String,
        required: [true, 'Фамилия - обязательное поле.'],
        trim: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value); // Исправлено на \s для пробела
            },
            message: 'Неправильно набрана фамилия',
        },
    },
    email: {
        type: String,
        required: [true, 'Почта - обязательное поле.'],
        unique: true, // Добавлено уникальное значение
        validate: {
            validator: function (value: string) {
                return value === 'MolodecOfficial' || /^\S+@\S+\.\S+$/.test(value);
            },
            message: 'Неправильный формат электронной почты.',
        },
    },
    password: {
        type: String,
        required: [true, 'Пароль - обязательное поле.'],
        select: false,
        minlength: [8, 'Пароль слишком короткий.'],
    },
    achievements: {
        type: [String],
        default: ["1"]
    },
    status: {
        type: String,
        enum: ['Студент', 'Преподаватель', 'Администратор', 'Владелец'],
        default: 'Студент'
    },
    specialty: {
        type: String,
        required: true,
        default: 'Не определена'
    },
    group: {
        type: String,
        required: true,
        default: 'Не определена'
    },
    code: {
        type: String,
        required: true,
        default: "0"
    },
    direction: {
        type: String,
        required: true,
        default: 'Не определено'
    },
    learning: {
        type: String,
        required: true,
        default: 'Не определено'
    },
    form_of_learning: {
        type: String,
        required: true,
        default: 'Не определено'
    },
    faculty: {
        type: String,
        required: true,
        default: 'Не определён'
    },
    course: {
        type: Number,
        required: true,
        default: 0
    },
    score: {
        firstCourse: {
            type: Object,
            default: {},
        },
        secondCourse: {
            type: Object,
            default: {},
        },
        thirdCourse: {
            type: Object,
            default: {},
        },
        fourthCourse: {
            type: Object,
            default: {},
        },
        fifthCourse: {
            type: Object,
            default: {},
        }
    },
    averageScore: {
        type: Number,
        default: 0.00
    },
    generalScore: {
        type: Number,
        default: 0.00
    },
    ranking: {
        type: String,
        default: 'Не определен'
    },
});

export const User = mongoose.models.User || mongoose.model<UserSchema>('User', userSchema);

export default mongoose.model<UserSchema>('User', userSchema);