import { ReactNode } from 'react'
import { z } from 'zod'
import { AbortController } from 'abort-controller'

export interface ValidationResult {
  result: boolean
  message?: string
}

export interface ToolUseContext {
  abortController: AbortController
  readFileTimestamps: Record<string, number>
}

export interface ToolRenderContext {
  verbose: boolean
  columns?: number
  debug?: boolean
}

export type SetToolJSXFn = (jsx: ReactNode) => void

export interface ToolResult<T = unknown> {
  type: 'result'
  resultForAssistant: string
  data: T
}

export interface Tool<TInput = any, TOutput = any> {
  name: string
  description(input?: TInput): Promise<string> | string
  userFacingName(input?: TInput): string
  inputSchema: z.ZodSchema<TInput>
  isEnabled(): Promise<boolean> | boolean
  isReadOnly(): boolean
  needsPermissions(input: TInput): boolean
  prompt(): Promise<string> | string
  validateInput?(input: TInput): Promise<ValidationResult> | ValidationResult
  renderToolUseMessage(input: TInput, context: ToolRenderContext): string
  renderToolUseRejectedMessage(input?: TInput, context?: ToolRenderContext): ReactNode
  renderToolResultMessage(output: TOutput, context: ToolRenderContext): ReactNode
  renderResultForAssistant(output: TOutput): string
  call(
    input: TInput,
    context: ToolUseContext
  ): AsyncGenerator<ToolResult<TOutput>, void, unknown>
}

// Export the Tool type as default for compatibility
export default Tool
