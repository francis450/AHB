import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';
import ERPNextService from '../services/erpnext';

const ERPNextTestComponent = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    details?: any;
  } | null>(null);

  const testConnection = async () => {
    setTesting(true);
    setResult(null);

    try {
      // Test basic connection
      const company = await ERPNextService.getCompany();
      
      // Test items fetch
      const items = await ERPNextService.getItems();
      
      setResult({
        success: true,
        message: 'ERPNext connection successful!',
        details: {
          company: company?.name || 'Unknown',
          itemsCount: items?.length || 0
        }
      });
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'Connection failed',
        details: error
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">ERPNext Connection Test</h3>
      
      <button
        onClick={testConnection}
        disabled={testing}
        className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
          testing
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {testing ? (
          <>
            <Loader className="animate-spin" size={16} />
            <span>Testing...</span>
          </>
        ) : (
          <span>Test Connection</span>
        )}
      </button>

      {result && (
        <div className={`mt-4 p-4 rounded-lg ${
          result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {result.success ? (
              <CheckCircle size={20} className="text-green-600" />
            ) : (
              <AlertCircle size={20} className="text-red-600" />
            )}
            <span className="font-medium">{result.message}</span>
          </div>
          
          {result.details && (
            <div className="text-sm">
              {result.success ? (
                <>
                  <p>Company: {result.details.company}</p>
                  <p>Items found: {result.details.itemsCount}</p>
                </>
              ) : (
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>Environment check:</p>
        <ul className="list-disc list-inside text-xs space-y-1">
          <li>URL: {import.meta.env.VITE_ERPNEXT_URL ? '✓ Set' : '✗ Not set'}</li>
          <li>API Key: {import.meta.env.VITE_ERPNEXT_API_KEY ? '✓ Set' : '✗ Not set'}</li>
          <li>API Secret: {import.meta.env.VITE_ERPNEXT_API_SECRET ? '✓ Set' : '✗ Not set'}</li>
        </ul>
      </div>
    </div>
  );
};

export default ERPNextTestComponent;
