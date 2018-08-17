//
//  CameraViewController.swift
//  AddSnap
//
//  Created by Taras on 7/6/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit
import AVFoundation
import GoogleMobileVision
import GoogleSignIn
import GoogleAPIClientForREST
import Foundation
import Alamofire

class CameraViewController: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate, AVCapturePhotoCaptureDelegate {
   
    
    let imagePicker = UIImagePickerController()

    lazy var textDetector: GMVDetector = GMVDetector(ofType: GMVDetectorTypeText, options: nil)
    let synthesizer = AVSpeechSynthesizer()
    
    lazy var renderContext = CIContext()
    var recognitionWidth: CGFloat = 0.0
    var recognitionHeight: CGFloat = 0.0
//    let scopes = [kGTLRAuthScopeSheetsSpreadsheets]
    private let service = GTLRSheetsService()
    
    @IBAction func choosePhotoAction(_ sender: Any) {
        self.imagePicker.allowsEditing = false
        self.imagePicker.sourceType = .photoLibrary
        self.present(self.imagePicker, animated: true, completion: nil)
    }
    
    @IBAction func takePhotoAction(_ sender: Any) {
        let settings = AVCapturePhotoSettings()
        photoOutput?.capturePhoto(with: settings, delegate: self)
    }

    
    @IBOutlet weak var chooseFromLibraryButton: UIButton!
    @IBOutlet weak var takePhotoButton: UIButton!
    @IBOutlet weak var cameraView: UIView!
    var captureSession = AVCaptureSession()
    var backCamera: AVCaptureDevice?
    var frontCamera: AVCaptureDevice?
    var currentCamera: AVCaptureDevice?
    var photoOutput: AVCapturePhotoOutput?
    var cameraPreviewLayer: AVCaptureVideoPreviewLayer?
    var image: UIImage? {
        willSet {
            guard let image = newValue else { return }
            guard let detected = self.detectTextFrom(image: image) else { return }
            for e in promoModel {
                if detected.lowercased().contains(e.logo.lowercased()) {
//                    let model = DataModel(match: true, terms: "", labelOfBrand: detected, matched: detected, labels: detected, text: detected, logo: detected, longtitude: "12321.32113", latitude: "23.231", timestamt: "\(Date().timeIntervalSince1970)")
                    //            GoogleSheetsDataProvider(provider).setData(model: model)
                    let imageView = SuccessScanView.init(frame: self.view.frame)
                    imageView.labelDiscount.text = e.promo
                    imageView.taxDiscountLabel.text = e.amount
                    self.view.addSubview(imageView)
                    imageView.action = {
                        imageView.removeFromSuperview()
                    }
                }
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        takePhotoButton.layer.cornerRadius = 23
        takePhotoButton.layer.masksToBounds = true
        imagePicker.delegate = self
        setupCaptureSession()
        setupDevice()
        setupInputOutput()
        setupPreviewLayer()
        startRunningCaptureSession()
    }
  
   @objc func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        picker.dismiss(animated: true, completion: {
            if let pickedImage = info[UIImagePickerControllerOriginalImage] as? UIImage {
//            guard let detected = self.detectTextFrom(image: pickedImage) else { return }
//            print(detected)
//            let imageView = SuccessScanView.init(frame: self.view.frame)
//            self.view.addSubview(imageView)
//            imageView.action = {
//                imageView.removeFromSuperview()
//            }
                self.image = pickedImage
        }
            
        })
    }
    
    
    
    
    func screenFocusedTextFrom(elements: [GMVTextElementFeature]) -> String? {
        guard elements.count > 0 else { return nil }
        var string:String = ""
        for e in elements {
            string += e.value + ", "
        }
        return string
    }
    
    func detectTextFrom(image: UIImage) -> String? {
        guard let blocks = textDetector.features(in: image, options: nil) else { return nil }
        var allElements = [GMVTextElementFeature]()
        for block in blocks {
            let textBlock = block as! GMVTextBlockFeature
            for line in textBlock.lines {
                for word in line.elements {
                    allElements.append(word)
                }
            }
        }
        return screenFocusedTextFrom(elements: allElements)
    }
    
    func synthesizeSpeech(string: String?) {
        guard let text = string else { return }
        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = AVSpeechSynthesisVoice(language: "en-GB")
        utterance.rate = 0.1
        
        synthesizer.speak(utterance)
    }
    
//    func didFailToLogin(with error: Error) {
//        print(error)
//    }
//
//    func didLoginSuccessfully(with authorizer: GTMFetcherAuthorizationProtocol) {
////        GoogleSheetsDataProvider(authorizer)
////        provider = authorizer
////        print(authorizer.debugDescription)
//    }

}


extension CameraViewController {
    func setupCaptureSession() {
        captureSession.sessionPreset = AVCaptureSession.Preset.photo
    }
    
    func setupDevice() {
        let deviceDiscoverySession = AVCaptureDevice.DiscoverySession(deviceTypes: [AVCaptureDevice.DeviceType.builtInWideAngleCamera], mediaType: AVMediaType.video, position: AVCaptureDevice.Position.unspecified)
        
        let devices = deviceDiscoverySession.devices
        
        for device in devices {
            if device.position == AVCaptureDevice.Position.back {
                backCamera = device
            } else if device.position == AVCaptureDevice.Position.front {
                frontCamera = device
            }
        }
        currentCamera = backCamera
    }
    
    func setupInputOutput() {
        do {
            let captureDeviceInput = try AVCaptureDeviceInput(device: currentCamera!)
            captureSession.addInput(captureDeviceInput)
            photoOutput = AVCapturePhotoOutput()
            photoOutput?.setPreparedPhotoSettingsArray([AVCapturePhotoSettings(format: [AVVideoCodecKey : AVVideoCodecType.jpeg])], completionHandler: nil)
            captureSession.addOutput(photoOutput!)
        } catch  {
            print(error.localizedDescription)
        }
    }
    
    func setupPreviewLayer() {
        cameraPreviewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        cameraPreviewLayer?.videoGravity = AVLayerVideoGravity.resizeAspectFill
        cameraPreviewLayer?.connection?.videoOrientation = AVCaptureVideoOrientation.portrait
        cameraPreviewLayer?.frame = cameraView.frame
        cameraView.layer.insertSublayer(cameraPreviewLayer!, at: 0)
    }
    
    func startRunningCaptureSession() {
        captureSession.startRunning()
    }
    
    func setData(model:DataModel) {
        let header = ["Authorization": "Bearer \(service.apiKey!)"]
        Alamofire.request("https://us-central1-adsnap-183811.cloudfunctions.net/appendToSpreadsheet?match=\(model.match)&terms=\(model.terms)&brand=\(model.labelOfBrand)&labels=\(model.labels)&textPieces=\(model.text)&logos=\(model.logo)&latitude=\(model.latitude)&longitude=\(model.longtitude)&&timestamp=\(Date().timeIntervalSince1970)",
            method: .put,
            parameters: nil ,
            encoding: URLEncoding.default,
            headers: header)
            .validate(statusCode: [200, 201, 204])
            .responseData { response in
                debugPrint(response)
                switch response.result {
                case .success(let value):
                    print("Successful response \(value)")
                case .failure(let error):
                    print("Failure response \(error)")
                    if error._code == NSURLErrorTimedOut || error._code == NSURLErrorNotConnectedToInternet {
                        //HANDLE TIMEOUT OR NO CONNECTION HERE IF NEEDED
                    }
                }
        }
    }
    
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
        if let imageData = photo.fileDataRepresentation() {
            print(imageData)
            image = UIImage(data: imageData)
        }
    }
}
