# Jira Redirect

Simple app to redirect to Jira issue from a issue key or a link.

# Setting subdomain

## Environment variable
You can set environment variable `NEXT_PUBLIC_SUBDOMAIN` to your atlassian subdomain. 
For example if your jira links are starting with `company.attlasian.net`, then your environment variable should be:
```
NEXT_PUBLIC_SUBDOMAIN=company
```

## Using subdomain path
Use `/subdomain/` path.
For example if your jira links are starting with `company.attlasian.net`, then your path should look like:
```
https://app-istance/subdomain/company
https://localhost:3000/subdomain/company
```
You can also use demo page for it: https://jira-redirect.vercel.app/subdomain/company