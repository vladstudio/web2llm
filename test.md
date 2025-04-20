## Page: https://www.tailwind-variants.org/docs/composing-components

**Tailwind Variants** allows you to easily compose components using the `extend` prop or the resultant function.

### Using the extend prop

The `extend` prop allows you to extend the component including its `variants`, `slots`, `defaultVariants` and `compoundVariants`. It automatically merges the values of same keys and offers Typescript autocomplete.

#### Basic example

  

#### Extending components with variants

Components with `variants` will inherit their variants when composed.

You can also extend components with `defaultVariants` and `compoundVariants`.

  

#### Extending components with slots

Components with `slots` will inherit their slots when composed.

  

![](https://www.tailwind-variants.org/_next/image?url=%2Fintro-avatar.png&w=828&q=75)

> “Tailwind variants allows you to reduce repeated code in your project and make it more readable. They fixed the headache of building a design system with TailwindCSS.”

Zoey Lang

Full-stack developer, HeroUI

### Using the result

You can use the result of the `tv()` function to compose your components. However this method is not type-safe and you will have to use the `class` / `className` prop to pass the result to the new component.

You can utilize either the `base` key, `slots`, or `variants` when composing components using the result string. The key you use should be in the form of a string array.

Overriding StylesExamples