import { User } from "~/server/models/user.model";

const allowedSubjects = [
    'История',
    'Математика',
    'Дискретная Математика',
    'Основы Российской Государственности',
    'Физика',
    'Иностранный Язык',
    'Инженерная Компьютерная Графика',
];

export default defineEventHandler(async (event) => {
    try {
        if (event.req.method === 'GET') {
            return { allowedSubjects };
        }

        const { userId, subject, score } = await readBody(event);

        // Проверка входных данных
        if (!userId || !subject || typeof score !== 'number' || score < 1 || score > 5) {
            throw createError({
                statusCode: 400,
                message: 'Не переданы корректные данные (userId, subject, score).'
            });
        }

        if (!allowedSubjects.includes(subject)) {
            throw createError({
                statusCode: 400,
                message: 'Недопустимый предмет.'
            });
        }

        // Поиск пользователя
        const user = await User.findById(userId);
        if (!user) {
            throw createError({
                statusCode: 404,
                message: 'Пользователь не найден.'
            });
        }

        if (!user.score) {
            user.score = {};  // Инициализация если нет объекта для оценок
        }

        if (!user.score[subject]) {
            user.score[subject] = [];  // Инициализация массива для оценок по предмету
        }

        // Добавление оценки
        user.score[subject].push(score);  // Сохраняем оценку как число

        // Вычисление среднего балла по каждому предмету
        const subjectAverages = Object.entries(user.score).map(([subj, scores]) => {
            if (scores.length === 0) return 0;  // Избегаем деления на ноль
            const numericScores = scores.map(Number);
            const average = numericScores.reduce((sum, s) => sum + s, 0) / numericScores.length;
            return average;
        });

        // Вычисление общего среднего балла (averageScore)
        const nonZeroAverages = subjectAverages.filter(avg => avg > 0);
        let averageScore = 0;
        if (nonZeroAverages.length > 0) {
            averageScore = nonZeroAverages.reduce((sum, avg) => sum + avg, 0) / nonZeroAverages.length;
        }

        // Вычисление общего балла (generalScore)
        const generalScore = averageScore * nonZeroAverages.length;

        // Обновление пользователя
        user.averageScore = averageScore.toFixed(2);
        user.generalScore = generalScore.toFixed(2);

        // Сохранение изменений
        await user.save();

        return { message: "Оценка успешно добавлена.", user };
    } catch (error: any) {
        console.error('Ошибка при добавлении оценки:', error);
        if (error.statusCode) throw error;
        throw createError({
            statusCode: 500,
            message: 'Внутренняя ошибка сервера.'
        });
    }
});