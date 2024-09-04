# GalacticGPT - OpenAI API NextJS boilerplate

This repository provides a boilerplate for creating a simple ChatGPT-like application using Next.js, Tailwind CSS, TypeScript, and the OpenAI API. It's designed to help you quickly get started with building chat applications with a modern tech stack.

# <span style="color: red;">🚧 Work in Progress</span>

**This project is currently under ongoing development. Check back soon for updates!**

## Features

- **Next.js**: React framework for server-side rendering and static site generation. (Page router)
- **Tailwind CSS**: Utility-first CSS framework for designing modern user interfaces.
- **TypeScript**: Superset of JavaScript that adds static types for better development experience.
- **OpenAI API**: Integration with OpenAI's API for conversational AI capabilities.

## Getting Started

To get started with this boilerplate, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chatgpt-app-boilerplate.git
cd chatgpt-app-boilerplate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a .env.local file in the root directory of the project and add your OpenAI API key:
```bash
OPENAI_API_KEY=your-openai-api-key
```

### 4. Run the Development Server
```bash
npm run dev
```

## Project Structure

- **`/components`**: Contains React components.
- **`/pages`**: Contains Next.js page components and API routes.
- **`/public`**: Static assets like images and fonts.
- **`/styles`**: Tailwind CSS configuration and global styles.
- **`/types`**: TypeScript types and interfaces.
- **`/utils`**: Utility functions and helpers.

## Tailwind CSS Configuration

The Tailwind CSS configuration can be found in `tailwind.config.js`. You can customize the design system according to your needs.

## API Integration

The integration with the ChatGPT API is managed in `utils/chatgpt.ts`. Modify this file to adjust the API calls as needed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to suggest improvements or report bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [your-email@example.com](mailto:your-email@example.com).
