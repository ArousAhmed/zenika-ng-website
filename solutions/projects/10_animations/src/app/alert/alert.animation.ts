import { animate, style, transition, trigger } from '@angular/animations';

export const alertAnimations = [
  trigger('disappear', [
    transition('* => void', [
      animate('500ms ease-in-out'),
      style({ marginBottom: 0, paddingTop: 0, paddingBottom: 0, height: '0px', opacity: 0 }),
    ]),
  ]),
];
