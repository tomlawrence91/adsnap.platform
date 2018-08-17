//
//  Networker.swift
//  AddSnap
//
//  Created by Taras on 7/10/18.
//  Copyright © 2018 AddSnap Inc. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

class Networker: NSObject {

//    class func requestData(method: HTTPMethod,
//                           parameters: [String:String]? = nil,
//                           headers:[String:String]? = nil,
//                           enpointUrl: String,
//                           completionHandler: @escaping (_ data: Data) -> Void,
//                           errorHandler: @escaping (_ data: Data) -> Void) {
//        var header = ["Content-type":"application/json"]
//        
//        if let optional = headers {
//            for h in optional {
//                header.updateValue(h.value, forKey: h.key)
//            }
//        }
//        print("Send request with: \(header, parameters)")
//        Alamofire.request(kBaseUrl + enpointUrl,
//                          method: method,
//                          parameters: parameters,
//                          encoding: JSONEncoding.default,
//                          headers: header)
//            .validate(statusCode: [200, 201, 204])
//            .responseData { response in
//                debugPrint(response)
//                switch response.result {
//                case .success(let value):
//                    print("Successful response")
//                    completionHandler(value)
//                case .failure(let error):
//                    print("Failure response")
//                    if error._code == NSURLErrorTimedOut || error._code == NSURLErrorNotConnectedToInternet {
//                        //HANDLE TIMEOUT OR NO CONNECTION HERE IF NEEDED
//                    }
//                    if let errorData = response.data {
//                        errorHandler(errorData)
//                    }
//                }
//        }
//    }
}
