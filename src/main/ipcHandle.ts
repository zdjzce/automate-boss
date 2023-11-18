export const getUserDirName = (app) => {
  const userDataDir = app.getPath('userData')

  return userDataDir
}

export const ipcEventHandle = {
  getUserDirName: getUserDirName
}
