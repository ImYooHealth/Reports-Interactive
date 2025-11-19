import React from 'react'
import { Link } from 'react-router-dom'
import * as CommonUtils from './CommonUtils.js'
import * as utils from './Resources/Overview/utils.js'
import ComponentsCollection from './newUiIdeas.js'

const t1p1 = 'Your blood is made up of many different types of cells. In our lab, we remove red blood cells and focus on checking the state of white blood cells.'
const t1p2 = 'On the right are different types of cells that comprise the white blood cells in your sample.'
const t1p3 = 'The inner circle represents the top level hierarchy and the outer circles show a breakdown of subtypes within those major cell types.'
const t1p4 = 'Below you will see definitions of major cell types and their respective functions.'

const t2p1 = "Your cells are now a part of ImYoo's human reference transcriptome database. Thank you!"
const t2p2 = 'This is a t-SNE plot of a portion of our database, and your cells are overlayed on top to show you where you land.'
const t2p3 = 'Each dot here is one of your cells, and how close they are to each other represents how similar they are to each other. Cells that group together are often cells of a common type, such as T Cells. By growing our reference database, you are helping us discover more rare and unique cell types and states.'

const Overview = () => {
    const [sunburstData, setSunburstData] = React.useState(null)
    const [tsneData, setTsneData] = React.useState(null)
    const [loadingImages, setLoadingImages] = React.useState(true)
    
    // Preload images using fetch to bypass browser image loading issues
    React.useEffect(() => {
        console.log('Overview: Preloading images with fetch...')
        let isMounted = true
        
        const loadImages = async () => {
            try {
                // Add timeout to fetch to prevent hanging
                const fetchWithTimeout = async (url, timeout = 5000) => {
                    const controller = new AbortController()
                    const timeoutId = setTimeout(() => controller.abort(), timeout)
                    
                    try {
                        const response = await fetch(url, { signal: controller.signal })
                        clearTimeout(timeoutId)
                        return response
                    } catch (err) {
                        clearTimeout(timeoutId)
                        throw err
                    }
                }
                
                // Load sunburst SVG
                console.log('Overview: Fetching sunburst...')
                const sunburstResponse = await fetchWithTimeout(`${CommonUtils.dataPath}Overview/sunburst.png`)
                console.log('Overview: Sunburst fetch complete, status:', sunburstResponse.status)
                if (!sunburstResponse.ok) throw new Error(`Sunburst HTTP ${sunburstResponse.status}`)
                const sunburstBlob = await sunburstResponse.blob()
                const sunburstUrl = URL.createObjectURL(sunburstBlob)
                
                if (isMounted) {
                    console.log('Overview: Sunburst loaded')
                    setSunburstData(sunburstUrl)
                }
                
                // Load tsne PNG
                console.log('Overview: Fetching tsne...')
                const tsneResponse = await fetchWithTimeout(`${CommonUtils.dataPath}Overview/tsne.png`)
                console.log('Overview: tsne fetch complete, status:', tsneResponse.status)
                if (!tsneResponse.ok) throw new Error(`tsne HTTP ${tsneResponse.status}`)
                const tsneBlob = await tsneResponse.blob()
                const tsneUrl = URL.createObjectURL(tsneBlob)
                
                if (isMounted) {
                    console.log('Overview: tsne loaded')
                    setTsneData(tsneUrl)
                    setLoadingImages(false)
                }
            } catch (error) {
                console.error('Overview: Failed to preload images:', error)
                console.error('Error details:', error.name, error.message)
                if (isMounted) {
                    setLoadingImages(false)
                }
            }
        }
        
        loadImages()
        
        return () => {
            isMounted = false
            // Clean up blob URLs
            if (sunburstData) URL.revokeObjectURL(sunburstData)
            if (tsneData) URL.revokeObjectURL(tsneData)
        }
    }, [])
    
    const handleImageError = (imageName, e) => {
        console.error(`Overview: Failed to load ${imageName} image`)
        
        // Retry up to 3 times
        if (retryCount.current[imageName] < 3) {
            retryCount.current[imageName]++
            console.log(`Overview: Retrying ${imageName} (attempt ${retryCount.current[imageName]})`)
            
            setTimeout(() => {
                if (imageName === 'sunburst') {
                    setSunburstKey(prev => prev + 1)
                } else {
                    setTsneKey(prev => prev + 1)
                }
            }, 200 * retryCount.current[imageName]) // Increasing delay
        } else {
            console.error(`Overview: ${imageName} failed after 3 retries`)
        }
    }
    
    const handleImageLoad = (imageName) => {
        console.log(`Overview: ${imageName} image loaded successfully`)
    }
    
    return (
        <div className='w-textPage'>
            <CommonUtils.Overhead title="Overview">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <p style={{fontFamily: "Space Grotesk"}} className="w-1/2"> </p>
                        <p style={{fontFamily: "Space Grotesk"}} className="text-2xl pl-20">Your Immune Army</p>
                    </div>

                    <div className="flex flex-row pl-2 pb-10">
                        <div className="flex flex-col w-1/2">
                            <p style={{fontFamily: "Space Grotesk"}} className=" text-lg pb-2">{t1p1}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-2">{t1p2}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-2">{t1p3}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg">{t1p4}</p>
                        </div>
                        <div className="flex flex-col w-1/2">
                            {/* Deployment: edit path */}
                            {loadingImages ? (
                                <div className="pl-5 p-2">Loading image...</div>
                            ) : sunburstData ? (
                                <img 
                                    className="pl-5 p-2" 
                                    src={sunburstData} 
                                    alt="Cell distribution"
                                    onLoad={() => handleImageLoad('sunburst')}
                                    onError={(e) => handleImageError('sunburst', e)}
                                />
                            ) : (
                                <div className="pl-5 p-2">Failed to load image</div>
                            )}
                            <div className="text-center justify-right inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-lg">
                                <Link to="/CellAbundance">See how you compare to others</Link>
                            </div>
                        </div>                            
                    </div>

                    <div className="flex flex-row">
                        <p style={{fontFamily: "Space Grotesk"}} className="text-2xl pl-2">Welcome to ImYoo's Database!</p>
                    </div>

                    <div className="flex flex-row">
                        {/* Deployment: edit path */}
                        {loadingImages ? (
                            <div className="w-1/2 h-full mt-6">Loading image...</div>
                        ) : tsneData ? (
                            <img 
                                className="w-1/2 h-full mt-6" 
                                src={tsneData} 
                                alt="Cell visualization"
                                onLoad={() => handleImageLoad('tsne')}
                                onError={(e) => handleImageError('tsne', e)}
                            />
                        ) : (
                            <div className="w-1/2 h-full mt-6">Failed to load image</div>
                        )}
                        <div className="flex flex-col w-1/2">
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-1">{t2p1}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-1">{t2p2}</p>
                            <p style={{fontFamily: "Space Grotesk"}} className="text-lg pb-1">{t2p3}</p>
                        </div>
                    </div>
                </div>
            </CommonUtils.Overhead>
        </div>
    )
}

export default Overview;