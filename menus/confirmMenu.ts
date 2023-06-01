import inquirer from 'inquirer';
export const confirmMenu = async (str: string) => {
  let confirmation: boolean;

  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: `Are you sure you want to ${str}?`,
        choices: ['Yes', 'No'],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Yes':
          confirmation = true;
          break;
        case 'No':
          confirmation = false;
          break;
      }
    });
  return confirmation;
};
