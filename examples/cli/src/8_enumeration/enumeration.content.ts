import { enu, type DeclarationContent } from 'intlayer';

const multipleLocalsContent = {
  key: 'enumeration',
  content: {
    numberOfCar: enu({
      '<-1': 'Less than minus one car',
      '-1': 'Minus one car',
      '0': 'No cars',
      '1': 'One car',
      '>5': 'Some cars',
      '>19': 'Many cars',
    }),
  },
} satisfies DeclarationContent;

export default multipleLocalsContent;
