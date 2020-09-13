import { generatePracticeText } from '../generatePracticeText';

describe('generatePracticeText', () => {
  global.Math.random = () => 0.5;

  it('returns randomized string with default params', () => {
    const sampleText = generatePracticeText({ glyphs: ['a', 'b', 'c'] });

    expect(sampleText).toEqual(
      'aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc aacb aabc'
    );
  });

  it('returns randomized string if practice length given', () => {
    const sampleText = generatePracticeText({
      glyphs: ['a', 'b', 'c'],
      practiceLength: 20,
    });

    expect(sampleText).toEqual('aacb aabc aacb aabc aacb aabc aacb aabc');
  });

  it('returns randomized string if word length given', () => {
    const sampleText = generatePracticeText({
      glyphs: ['a', 'b', 'c'],
      practiceLength: 20,
      wordLength: 2,
    });

    expect(sampleText).toEqual('bc bc bc bc bc bc bc bc bc bc bc bc');
  });

  it('returns randomized string if uniqueWordCount is given', () => {
    const sampleText = generatePracticeText({
      glyphs: ['a', 'b', 'c'],
      practiceLength: 20,
      uniqueWordCount: 2,
    });

    expect(sampleText).toEqual('aacb aabc aacb aabc aacb aabc');
  });

  it('returns randomized string even if the configured practice length is shorter than the generated text', () => {
    const sampleText = generatePracticeText({
      glyphs: ['a', 'b', 'c', 'd', 'e'],
      practiceLength: 10,
      uniqueWordCount: 4,
      wordLength: 6,
    });

    expect(sampleText).toEqual('aadcbe aaebdc aacdeb aabecd');
  });
});
