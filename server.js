const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Логи запросов
app.use(morgan('tiny'));

// Статика (HTML, CSS, файлы для скачивания)
app.use(express.static(path.join(__dirname, 'public')));

// Редирект на внешнюю ссылку (placeholder) — можно изменить на любую ссылку
app.get('/download/redirect', (req, res) => {
  // Замените на вашу ссылку или на официальный Minecraft
  const externalLink = 'https://example.com/minecraft_installer.zip';
  res.redirect(externalLink);
});

// Отдача файла, расположенного в public/downloads
app.get('/download/local', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'downloads', 'minecraft_installer.zip');
  // Важно: убедитесь, что файл существует в указанной папке
  res.download(filePath, 'minecraft_installer.zip', (err) => {
    if (err) {
      console.error('Ошибка при отправке файла:', err);
      res.status(404).send('Файл не найден на сервере.');
    }
  });
});

// Простая API-информация (необязательно)
app.get('/api/info', (req, res) => {
  res.json({
    project: 'Minecraft Download Site (demo)',
    official: 'https://www.minecraft.net/ru-ru/download'
  });
});

// Любой другой маршрут — index.html (SPA-friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});