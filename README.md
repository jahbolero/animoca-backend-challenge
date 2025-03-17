
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
$ npm run start 
```

## Testing
Running a GET request to `localhost:3000/api/referral/generateTestCodes` will generate sample invite codes for testing. A post request to `localhost:3000/api/referral/inviteCodes` can also be done to generate a test invite code.

# Invite Code System

This project implements the requirements in the system design:
- Invite codes with usage limits based on a maxUses field.
- Emails can only claim invite codes once.
- Referral tracking using 2 tables to associate the code creator and code claimer. The reason this was done is to maintain simplicity while adhering to the requirements.
- Database transaction lock to support concurrent users.

## Future Improvements

- Implement comprehensive testing
- Proper authentication and authorization
- Improve input and data validation
- Signature verification to avoid wallet spoofing.
- Admin dashboard for invite code management
- Email verification for invite code usage

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).