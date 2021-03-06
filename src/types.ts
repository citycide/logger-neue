import * as colorette from "colorette"

export type LooseObject = {
  [key: string]: any
}

export type DeepMutable <T> = {
  -readonly [K in keyof T]: T[K]
}

export type VoidKeys <T> = {
  [K in keyof T]: T[K] extends null | undefined ? K : never
}[keyof T]

type PickOfType <T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

export type Defined <T> = Pick<T, Exclude<keyof T, VoidKeys<T>>>

export type Style = PickOfType<typeof colorette, colorette.Style>

export type ConsoleOptions = Partial<{
  fullColor: boolean,
  level: number | string,
  levels: LevelMap,
  template: string
}> | undefined

export type NormalizedConsoleOptions = {
  fullColor: boolean,
  level: number,
  levels: NormalizedLevelMap,
  template: string
}

export type FileOptions = Partial<{
  dir: string,
  level: number | string,
  levels: LevelMap
  path: string,
  template: string
}> | undefined

export type NormalizedFileOptions = {
  dir: string,
  level: number,
  levels: LevelMap
  path: string,
  template: string
}

export type Options = {
  console?: ConsoleOptions,
  file?: FileOptions,
  levels?: LevelMap
}

export type LevelDescriptorObject = {
  level: number,
  style?: Style | Style[],
  isError?: boolean
}

export type NormalizedLevelDescriptor = {
  level: number,
  style: Style[],
  isError: boolean
}

export type LevelDescriptorTuple3 = [number, Style | Style[], boolean]
export type LevelDescriptorTuple2 = [number, Style | Style[]]
export type LevelDescriptorTuple1 = [number]

export type LevelDescriptorTuple =
  | LevelDescriptorTuple3
  | LevelDescriptorTuple2
  | LevelDescriptorTuple1

export type LevelDescriptor =
 | LevelDescriptorObject
 | LevelDescriptorTuple

export type LevelMap = {
  [key: string]: LevelDescriptor
}

export type NormalizedLevelMap = {
  [key: string]: NormalizedLevelDescriptor
}

export type InputContext = {
  args: any[],
  padding: string,
  level: () => string,
  timestamp: () => string,
  input: () => string
}

export type InputState = {
  colorizer: (level: string) => string,
  fullColor?: boolean,
  level: string,
  padding?: string
}

export type Context = Required<InputContext>
export type State = Required<InputState>
