# Getting Started with App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### To launch the project
```sh
npm start
```

### To Run Tests
```sh
npm test
```

## Deployment

The project is integrated with Git. Upon committing to the `main` branch, deployment will be triggered automatically. Otherwise, you can manually deploy using the following steps:

```sh
amplify push   # Push changes to the cloud
amplify publish   # Initiate deployment
```

## Project Configuration

This project was created using `create-react-app`. The backend setup followed these steps:

1. **IAM User Setup**: Created an IAM user and configured it with the required policies.
2. **Installed AWS CLI & Amplify**: Ensured necessary dependencies were installed.
3. **Configured Cognito User Pool**: Set up Cognito user pool for user authentication.
4. **Initialized Amplify**: Used `amplify init` to create the Amplify project structure.
5. **Added Authentication**: `amplify add auth` to enable authentication.
6. **Created API**:
   - `amplify add api` to set up a REST API.
   - Integrated a DynamoDB table named `students`.
7. Loded mock data into dynamo db using loadStudents scripts. 
8. **GraphQL API Setup**: Switched to GraphQL due to authorization issues with REST API.
9. **Continuous Deployment**: Integrated Git repository with Amplify for automated deployments.

## Challenges Faced

Initially, the REST API encountered authentication issues, returning `unauthorized` or `404` errors despite providing the correct token. After debugging, the suspected issue was improper IAM role permissions for DynamoDB access. Even after granting access, the errors persisted, leading to a switch to GraphQL API - which did not pose much issues compared to rest-api.

## What Could Have Been Done Better

1. Instead of spending time on adding APIs or creating the backend using amplify, could have created a own node server and woudld have deployed to aws using aws beanstalk.
2. Using a custom backend with AWS SDK libraries would have provided more flexibility to implement custom authentication handlers.
3. This approach would have allowed more control over APIs, enabling better customization.
4. Deployment issues could have been identified more easily, especially IAM role-related execution issues. A single IAM role with the required policies could have been used across the project instead of using auto-created roles.

## Implemented Features

1. **Dashboard Page**: Displays user profile and student list.
2. **Student List Page**:
   - Implements a React table with backend pagination.
   - Fetches student data from DynamoDB.

## TODOs

1. **Testing**: Add test coverage for the Dashboard and Student List pages.
2. **Code Refactoring**: Improve component structure and optimize performance.

## Deployment URL

You can access the application at:

[Live Application](https://main.d3nnutv8kn83vk.amplifyapp.com/)

**Note**: You need to create an account and sign in to use the application.

A test account will be provided in the future and attached to this README.

