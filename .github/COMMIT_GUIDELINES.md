# Commit Guidelines

This document outlines the commit message conventions for this project.

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (formatting, missing semicolons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

## Examples

### Feature
```
feat(api): add Archive API endpoint for NY Times

- Implement useGetArchiveByMonthQuery hook
- Add Zod schema validation
- Include error handling
```

### Fix
```
fix(utils): use template literal instead of string concatenation

Replace deprecated substr() with slice() method
```

### Style
```
style(scss): update color variables for dark theme

Improve contrast ratios for better accessibility
```

### Refactor
```
refactor(components): extract ArticleCard to separate component

Improve code organization and reusability
```

## Best Practices

1. **Keep commits small** - One logical change per commit
2. **Write clear subjects** - Use imperative mood ("add" not "added")
3. **Explain why, not what** - The code shows what changed
4. **Reference issues** - Use "Closes #123" when applicable
5. **Be consistent** - Follow the format consistently

## Commit Workflow

1. Make small, focused changes
2. Stage related files together
3. Write a clear commit message
4. Review before pushing
