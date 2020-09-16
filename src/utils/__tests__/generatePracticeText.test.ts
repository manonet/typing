import { generatePracticeText } from '../generatePracticeText';

describe('generatePracticeText', () => {
  global.Math.random = () => 0.5;

  it('returns randomized string with default params', () => {
    const lessonText = generatePracticeText({ glyphs: ['a', 'b', 'c'] });

    expect(lessonText).toEqual(
      'aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc'
    );
  });

  it('returns randomized string if practice length given', () => {
    const lessonText = generatePracticeText({
      glyphs: ['a', 'b', 'c'],
      practiceLength: 20,
    });

    expect(lessonText).toEqual('aacb aabc aacb aabc aacb aabc aacb aabc');
  });

  it('returns randomized string if word length given', () => {
    const lessonText = generatePracticeText({
      glyphs: ['a', 'b', 'c'],
      practiceLength: 20,
      wordLength: 2,
    });

    expect(lessonText).toEqual('bc bc bc bc bc bc bc bc bc bc bc bc');
  });

  it('returns randomized string if uniqueWordCount is given', () => {
    const lessonText = generatePracticeText({
      glyphs: ['a', 'b', 'c'],
      practiceLength: 20,
      uniqueWordCount: 2,
    });

    expect(lessonText).toEqual('aacb aabc aacb aabc aacb aabc');
  });

  it('returns randomized string even if the configured practice length is shorter than the generated text', () => {
    const lessonText = generatePracticeText({
      glyphs: ['a', 'b', 'c', 'd', 'e'],
      practiceLength: 10,
      uniqueWordCount: 4,
      wordLength: 6,
    });

    expect(lessonText).toEqual('aadcbe aaebdc aacdeb aabecd');
  });
});
