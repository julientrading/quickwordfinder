# Contributing to QuickWordFinder

## Commit Message Conventions

We follow conventional commit standards to maintain a clean and professional project history.

### Format
```
<type>: <description>
```

### Types
- **feat**: New feature or functionality
- **fix**: Bug fixes or corrections
- **docs**: Documentation changes
- **style**: Code formatting, CSS/UI changes
- **refactor**: Code restructuring without functionality changes
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates
- **perf**: Performance improvements

### Examples

#### Good Commit Messages ✅
```
feat: add Wordle mode with green/yellow/gray letter filtering
fix: resolve mobile navigation menu overlap issue
docs: update README with deployment instructions
style: improve search button hover animations
refactor: optimize word filtering algorithm for better performance
test: add unit tests for Scrabble tile validation
chore: update package.json dependencies
perf: implement lazy loading for word results
```

#### Poor Commit Messages ❌
```
- "fix stuff"
- "changes"
- "update"
- "work in progress"
- "final version"
- "this should work"
```

### Branch Naming Conventions

When creating feature branches, use descriptive names:

```
feature/wordle-mode-implementation
fix/mobile-responsive-layout
docs/update-installation-guide
style/improve-button-animations
```

### Pull Request Guidelines

1. **Clear title**: Summarize the changes in the PR title
2. **Detailed description**: Explain what was changed and why
3. **Link issues**: Reference any related issues
4. **Test locally**: Ensure changes work before submitting
5. **Single purpose**: Each PR should address one specific feature/fix

### Development Workflow

1. **Create a feature branch** from main
2. **Make your changes** with clear, conventional commits
3. **Test thoroughly** on multiple devices/browsers
4. **Create a pull request** with descriptive title and details
5. **Review your own changes** before merging
6. **Merge to main** after approval
7. **Delete the feature branch** after successful merge

### Code Quality Standards

- Write semantic HTML5
- Follow CSS BEM methodology for class naming
- Comment complex JavaScript functions
- Maintain mobile-first responsive design
- Ensure accessibility compliance
- Optimize for performance (< 2 second load times)

### Questions?

If you have questions about these conventions or need clarification on the development process, refer to the main README.md or create an issue for discussion.

---

*These conventions help maintain professional code quality and make collaboration easier as the project grows.*
