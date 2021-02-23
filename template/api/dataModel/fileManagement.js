import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer';

export function saveFolder(data) {
  return api({
    method: 'post',
    url: appServer.file + 'fileFolder/saveFolder',
    data: {...data}
  })
}

export function getFolderTree(params) {
  return api({
    method: 'get',
    url: appServer.file + 'fileFolder/getFolderTree',
    params: {...params}
  })
}

export function getFileFolderList(params) {
  return api({
    method: 'get',
    url: appServer.file + 'fileFolder/getFoladerList',
    params: {...params}
  })
}

export function renameFileFolder(data) {
  return api({
    method: 'post',
    url: appServer.file + 'fileFolder/renameFileFolder',
    data: {...data}
  })
}

export function deletedFileFolder(params) {
  return api({
    method: 'get',
    url: appServer.file + 'fileFolder/deleteFolderById',
    params: {...params}
  })
}
export function batchDeletedFileFolder(data) {
  return api({
    method: 'post',
    url: appServer.file + 'fileFolder/batchDeleteFolder',
    data: {...data}
  })
}

export function filePreview(params) {
  return api({
    method: 'get',
    url: appServer.file + 'fileFolder/preview',
    params: {...params}
  })
}

export function download(params) {
  return api({
    method: 'get',
    url: appServer.file + 'fileFolder/download',
    params: {...params}
  })
}

export function uploadFile(data) {
  return api({
    url: `${appServer.file}fileFolder/uploadFile`, 
    data,
    method: 'post'
  })
}

export function moveFile(params) {
  return api({
    url: `${appServer.file}fileFolder/move`, 
    params: {...params},
    method: 'get'
  })
}

export function copyFile(params) {
  return api({
    url: `${appServer.file}fileFolder/copy`, 
    params: {...params},
    method: 'get'
  })
}

export function batchMoveFile(data) {
  return api({
    url: `${appServer.file}fileFolder/batchMove`, 
    data: {...data},
    method: 'post'
  })
}

export function batchCopyFile(data) {
  return api({
    url: `${appServer.file}fileFolder/batchCopy`, 
    data: {...data},
    method: 'post'
  })
}

export function downloadBatch(data) {
  return api({
    method: 'post',
    url: appServer.file + 'fileBatchDownload/download',
    data: {...data}
  })
}