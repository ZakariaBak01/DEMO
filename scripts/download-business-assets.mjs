import { mkdir, writeFile } from 'node:fs/promises';

const clips = [
  ['hero-1', 'business-people-at-work-meeting-4809'],
  ['hero-2', 'open-office-space-914'],
  ['hero-3', 'man-working-on-his-laptop-308'],
  ['hero-4', 'office-meeting-261'],
  ['feature-1', 'people-having-a-work-meeting-around-a-table-4547'],
  ['feature-2', 'business-man-exposing-graphs-42648'],
  ['feature-3', 'person-typing-on-a-computer-in-detail-4907'],
  ['feature-4', 'professional-woman-working-in-an-office-42664'],
  ['feature-5', 'typing-on-a-laptop-close-up-1781'],
];
await mkdir('public/business', { recursive: true });
const credits = ['# Business media sources', '', 'Downloaded from Mixkit on 2026-09-20. See https://mixkit.co/license/#videoFree for terms.', ''];
async function download(url, file) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1000) throw new Error(`Invalid media: ${url}`);
  await writeFile(file, bytes);
  console.log(`${file}: ${(bytes.length / 1048576).toFixed(1)} MB`);
}
for (let i = 0; i < clips.length; i += 3) {
  await Promise.all(clips.slice(i, i + 3).map(async ([name, slug]) => {
    const page = `https://mixkit.co/free-stock-video/${slug}/`;
    const html = await (await fetch(page)).text();
    if (!html.includes('Stock Video Free License')) throw new Error(`Verify license: ${page}`);
    const id = slug.match(/\d+$/)[0];
    const video = [...html.matchAll(/https:[^\s"<>]+\.mp4/g)].map(m => m[0]).find(u => u.includes(`/${id}/`) && !u.includes('-360'));
    const poster = [...html.matchAll(/https:[^\s"<>]+\.(?:jpg|webp)/g)].map(m => m[0]).find(u => u.includes(`/${id}/`));
    if (!video || !poster) throw new Error(`Missing media: ${page}`);
    await download(video, `public/business/${name}.mp4`);
    await download(poster, `public/business/${name}.jpg`);
    credits.push(`- ${name}: [${slug}](${page}) — [video](${video}), [image](${poster})`);
  }));
}
await writeFile('public/business/SOURCES.md', credits.join('\n') + '\n');
