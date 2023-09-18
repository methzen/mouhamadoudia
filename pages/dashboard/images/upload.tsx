import { useState } from "react"
import Head from "next/head"

import Header from "../../../components/dashboard/header"
import Sidebar from "../../../components/dashboard/sidebar"

import authUser from "../../../api/admin-user/auth"

import checkIfImageFilenameExists from "../../../api/images/checkIfImageFilenameExists"
import uploadImage from "../../../api/images/uploadImage"
import { NextPageContext } from "next"

type UploadState = {
  selectedFile: File|null,
  loading: boolean,
  submitError: boolean,
  noFileError: boolean,
  filenameExistsError: boolean,
  filenameSpacesError: boolean,
  success: boolean
}

Upload.getInitialProps = async ({req,res}: NextPageContext) => {
  const authResult = await authUser(req)

  if (!authResult.success) {
    res?.writeHead(302, {Location: "/login"})
    res?.end()
  }

  return {}
}
export default function Upload(props:any) {

  const [initialState, setInitialState] = useState<UploadState>({
    selectedFile: null,
    loading: false,
    submitError: false,
    noFileError: false,
    filenameExistsError: false,
    filenameSpacesError: false,
    success: false
  })

  const handleInputChange = (event:any) => {
    setInitialState(state => ({...state, selectedFile: event.target.files[0]}))
  }

  const uploadImageRequest = (event:any) => {
    event.preventDefault()
  
    let formData = new FormData()
    const myFile = new File([initialState.selectedFile as unknown as BlobPart], initialState?.selectedFile?.name as string)
    formData.append("selectedFile", myFile)
  
    if (!initialState.selectedFile) {
      setInitialState(state=>({...state,
        loading: false,
        submitError: false,
        filenameExistsError: false,
        noFileError: true,
        filenameSpacesError: false,
        success: false
      }))
    } else if ((initialState.selectedFile).name.indexOf(" ") !== -1) {
      setInitialState(state =>({...state,
        loading: false,
        submitError: false,
        filenameExistsError: false,
        noFileError: false,
        filenameSpacesError: true,
        success: false
      }))
    } else {
      setInitialState(state=>({...state,
        loading: true,
        submitError: false,
        filenameExistsError: false,
        noFileError: false,
        filenameSpacesError: false,
        success: false
      }))
  
      checkIfImageFilenameExists(initialState.selectedFile.name, function(existsResponse:any) {
        if (!existsResponse.success) {
          setInitialState(state =>({...state,
            loading: false,
            submitError: false,
            filenameExistsError: true,
            noFileError: false,
            filenameSpacesError: false,
            success: false
          }))
        } else {
          uploadImage(formData, function(apiResponse:any) {
            if (apiResponse.submitError) {
              setInitialState(state=> ({...state,
                loading: false,
                submitError: true,
                filenameExistsError: false,
                noFileError: false,
                filenameSpacesError: false,
                success: false
              }))
            } else if (!apiResponse.authSuccess) {
              window.location.href = "/login"
            } else if (apiResponse.noFileError) {
              setInitialState(state=>({...state,
                loading: false,
                submitError: false,
                filenameExistsError: false,
                noFileError: true,
                filenameSpacesError: false,
                success: false
              }))
            } else if (!apiResponse.success) {
              setInitialState(state=>({...state,
                loading: false,
                submitError: true,
                filenameExistsError: false,
                noFileError: false,
                filenameSpacesError: false,
                success: false
              }))
            } else {
              setInitialState(state=>({...state,
                loading: false,
                submitError: false,
                filenameExistsError: false,
                noFileError: false,
                filenameSpacesError: false,
                success: true
              }))
            }
          })
        }
      })
    }
  }
    return (
      <div className="db-layout-wrapper">
        <Head>
          <title>Upload Image | Admin</title>
        </Head>
        <Header />
        <Sidebar page="images" />
        <div className="db-layout-content-container">
          <div className="images-upload-content">
            <div className="images-upload-header">
              <span>Upload Image</span>
            </div>
            <div className="images-upload-form-container">
              <form onSubmit={uploadImageRequest}>
                <div className="images-upload-form-label">
                  <span>Choose a file:</span>
                </div>
                <input
                  type="file"
                  name="selectedFile"
                  onChange={handleInputChange}
                />
                <div className="images-upload-form-submit-btn-container">
                  {
                    !initialState.loading ?
                    <button className="images-upload-form-submit-btn" type="submit">Submit</button> :
                    <button className="images-upload-form-submit-btn loading">Loading</button>
                  }
                </div>
              </form>
            </div>
            {
              initialState.success ?
              <div className="images-upload-success-msg">
                <span>Success!</span>
              </div> : null
            }
            {
              initialState.submitError ?
              <div className="images-upload-error-msg">
                <span>An error occurred.</span>
              </div> : null
            }
            {
              initialState.filenameExistsError ?
              <div className="images-upload-error-msg">
                <span>Filename already exists.</span>
              </div> : null
            }
            {
              initialState.filenameSpacesError ?
              <div className="images-upload-error-msg">
                <span>Spaces need to be removed from the filename before uploading.</span>
              </div> : null
            }
            {
              initialState.noFileError ?
              <div className="images-upload-error-msg">
                <span>No file was detected.</span>
              </div> : null
            }
          </div>
        </div>
      </div>
    )
}