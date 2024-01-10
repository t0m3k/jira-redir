# Jira Redirect

Simple app to redirect to Jira issue from a issue key or a link.

# Setting subdomain

## Environment variable
You can set environment variable `NEXT_PUBLIC_SUBDOMAIN` to your atlassian subdomain. 
For example if your jira ticket links are starting with `company.attlasian.net/browse`, then your environment variable should be:
```
NEXT_PUBLIC_SUBDOMAIN=company.attlasian.net/browse
```

You can also use demo page for it: https://j.t90.dev/subdomain/company
