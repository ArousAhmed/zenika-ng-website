# How this training course is built

The Angular Workspace is divided into projects.

## Part One

The `01_reminders` project is the starting application provided to trainees:

Trainees must complete projects `02` to `07` in a linear fashion, as each project N is based on project N-1.

- `02_angular_cli`
- `03_best_practices`
- `04_rxjs`
- `05_standalone`
- `06_router`
- `07_forms`

Having completed project `07`, trainees can be proud of the level they have achieved.
They have all the basic ingredients to build highly responsive Angular Applications!

They started with an application where every component needing data would fetch it from the network.
And now, the data is centralized in services and made available as observables that are consumed by the components.

## Second part

Starting with project `08`, trainees can follow the labs in any order, as all these projects inherit from the same base project `07`.

For example:

- the project `08_i18n` is based on project `07_forms`.
- the `09_ssr` project is also based on the `07_forms` project.

This means that the `09_ssr` project contains no code related to internationalization (i18n).

## About the `*.spec.ts` files

All specs files for all projects should pass.

Project `12_tests` is the only one to really test the application's functionality.
In all other projects, testing is limited configuring the testing module correctly.
