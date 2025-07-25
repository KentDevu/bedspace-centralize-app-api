// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="node" />
import app from './app';

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 