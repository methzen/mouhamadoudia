import { useState } from "react"
import Head from "next/head"

import Header from "../../../../components/dashboard/header"
import Sidebar from "../../../../components/dashboard/sidebar"
import DeleteImageModal from "../../../../components/dashboard/modals/deleteImage"
import { NextPageContext } from "next"
import getImageByFilename from "../../../../api/images/getImageByFilename"
import updateImageFilename from "../../../../api/images/updateImageFilename"
import checkIfImageFilenameExists from "../../../../api/images/checkIfImageFilenameExists"
import deleteImage from "../../../../api/images/deleteImage"

Filename.getInitialProps = async ({req, res, query}: NextPageContext) =>{
  const apiResult = await getImageByFilename(query.filename, req)

  if (!apiResult.authSuccess) {
    res?.writeHead(302, { Location: "/login" })
    res?.end()
  }

  return {
    notFoundError: apiResult && apiResult.notFoundError,
    fileSize: apiResult && apiResult.fileSize,
    fileCreated: apiResult && apiResult.fileCreated,
    filename: apiResult && apiResult.filename
  }
}

export default function Filename({notFoundError, fileSize, fileCreated, filename}:any) {
      //update filename
      const [filenameInputValue, setFilenameInputValue] = useState(filename)
      const [updateLoading, setUpdateLoading] = useState(false)
      const [updateSubmitError, setUpdateSubmitError] = useState(false)
      const [filenameAlreadyExistsError, setFilenameAlreadyExistsError] = useState(false)
      const [updateSuccess, setUpdateSuccess] = useState(false)
       //delete image
      const [showDeleteImageModal,setShowDeleteImageModal] = useState(false)
      const [deleteLoading,setDeleteLoading] = useState(false)
      const [deleteError,setDeleteError] = useState(false)


  const updateFilenameInputValue = (event:any) => {
    setFilenameInputValue(event.target.value)
  }

  const submitUpdateRequest = () => {
    if (!filenameInputValue) {
      setUpdateSubmitError(true)
      setUpdateSuccess(false)
    } else {
      setUpdateLoading(true)
      setUpdateSuccess(false)
  
      checkIfImageFilenameExists(filenameInputValue, function(existsResponse:any) {
        if (!existsResponse.success) {
          setUpdateSubmitError(false)
          setFilenameAlreadyExistsError(true)
          setUpdateSuccess(false)
          setUpdateLoading(false)
        } else {
          updateImageFilename(filename, filenameInputValue, function(response:any) {
            if (response.submitError) {
              setUpdateSubmitError(true)
              setFilenameAlreadyExistsError(false)
              setUpdateSuccess(false)
              setUpdateLoading(false)
            } else if (!response.authSuccess) {
              window.location.href = "/login"
            } else if (!response.success) {
              setUpdateSubmitError(true)
              setFilenameAlreadyExistsError(false)
              setUpdateSuccess(false)
              setUpdateLoading(false)
            } else {
              setUpdateLoading(false)
              window.location.href = `/images/edit/${filenameInputValue}`
            }
          })
        }
      })
    }
  }

  const hideDeleteImageModal = () => {
    setShowDeleteImageModal(false)
    setDeleteLoading(false)
    setDeleteError(false)
  }

  const showDeleteImageModale = () => {
    setShowDeleteImageModal(true)
  }

  const deleteImageRequest = () => {
    setDeleteLoading(true)
    setDeleteError(false)
  
    deleteImage(filename, function(response:any) {
      if (response.submitError) {
        setDeleteLoading(false)
        setDeleteError(true)
      } else if (!response.authSuccess) {
        window.location.href = "/login"
      } else if (!response.success) {
        setDeleteLoading(false)
        setDeleteError(true)
      } else {
        window.location.href = "/images"
      }
    })
  }

    return (
      <div className="layout-wrapper">
        <Header />
        <Sidebar page="images" />
        <div className="layout-content-container">
          {
            !notFoundError ?
            <div className="images-edit-content">
              <div className="images-edit-header">
                <span>Image Details</span>
              </div>
              <div className="images-edit-metadata-container">
                <div className="images-edit-metadata-title">
                  <span>Metadata</span>
                </div>
                <div className="images-edit-metadata-items">
                  <div className="images-edit-metadata-item">
                    <div className="images-edit-metadata-item-label">
                      <span>Filename:</span>
                    </div>
                    <div className="images-edit-metadata-item-data">
                      <span>{filename}</span>
                    </div>
                  </div>
                  <div className="images-edit-metadata-item">
                    <div className="images-edit-metadata-item-label">
                      <span>File size:</span>
                    </div>
                    <div className="images-edit-metadata-item-data">
                      <span>{fileSize}</span>
                    </div>
                  </div>
                  <div className="images-edit-metadata-item">
                    <div className="images-edit-metadata-item-label">
                      <span>Created:</span>
                    </div>
                    <div className="images-edit-metadata-item-data">
                      <span>{fileCreated}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="images-edit-form-container">
                <div className="images-edit-form-title">
                  <span>Edit Filename</span>
                </div>
                <div className="images-edit-form-section">
                  <div className="images-edit-form-section-label">
                    <span>Filename</span>
                  </div>
                  <div className="images-edit-form-section-input">
                    <input
                      type="text"
                      value={filenameInputValue}
                      onChange={updateFilenameInputValue}
                    />
                  </div>
                </div>
                <div className="images-edit-page-submit-btn-section">
                  <div className="images-edit-form-btn-container">
                    {
                      !updateLoading ?
                      <div onClick={submitUpdateRequest} className="images-edit-form-btn">
                        <span>Update</span>
                      </div> :
                      <div className="images-edit-form-btn loading">
                        <span>Loading</span>
                      </div>
                    }
                  </div>
                  {
                    updateSubmitError ?
                    <div className="images-edit-submit-error-msg">
                      <span>An error occurred.</span>
                    </div> : null
                  }
                  {
                    filenameAlreadyExistsError ?
                    <div className="images-edit-submit-error-msg">
                      <span>Filename already exists!</span>
                    </div> : null
                  }
                  {
                    updateSuccess ?
                    <div className="images-edit-submit-success-msg">
                      <span>Success!</span>
                    </div> : null
                  }
                </div>
              </div>
              <div className="images-edit-delete-container">
                <div className="images-edit-delete-title">
                  <span>Delete Image</span>
                </div>
                <div className="images-edit-delete-subtitle">
                  <span>This will remove the image from the server. Before deleting, ensure this image is not being used anywhere.</span>
                </div>
                <div className="images-edit-delete-btn-container">
                  <div onClick={showDeleteImageModale} className="images-edit-delete-btn">
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            </div> :
            <div className="images-edit-get-data-error-msg">
              <span>Image not found.</span>
            </div>
          }
        </div>
        <DeleteImageModal
          error={deleteError}
          loading={deleteLoading}
          show={showDeleteImageModal}
          hideRequest={hideDeleteImageModal}
          deleteRequest={deleteImageRequest}
        />
      </div>
    )
}