import 'react';

declare module 'react' {
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: 'true' | 'false' | boolean | string;
    toolparamdescription?: string;
  }

  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolparamdescription?: string;
  }

  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
  }

  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
  }

  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
  }
}

// Global ambient interface for Model Context Protocol browser APIs if accessed via window/navigator/document
declare global {
  interface Document {
    modelContext?: {
      registerTool?: (
        toolDefinition: {
          name: string;
          description: string;
          inputSchema?: Record<string, unknown>;
        },
        handler: (params: Record<string, unknown>) => Promise<unknown> | unknown
      ) => void;
      listTools?: () => unknown[];
    };
  }

  interface Navigator {
    modelContext?: {
      registerTool?: (
        toolDefinition: {
          name: string;
          description: string;
          inputSchema?: Record<string, unknown>;
        },
        handler: (params: Record<string, unknown>) => Promise<unknown> | unknown
      ) => void;
      listTools?: () => unknown[];
    };
  }
}
