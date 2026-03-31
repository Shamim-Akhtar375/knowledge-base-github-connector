import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

const KnowledgeCard = ({ title, description, category, author, url }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-6 flex flex-col h-full font-sans group">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-primary">
          <BookOpen size={14} />
          {category || "General"}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
        {description}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 border border-white shadow-sm">
            <span className="text-xs font-medium text-gray-600">
              {author ? author.substring(0, 2).toUpperCase() : 'GH'}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-700">
            {author || "GitHub Issue"}
          </p>
        </div>
        
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50 transition-colors">
            <ArrowRight size={20} />
          </a>
        ) : (
          <button className="text-primary hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50 transition-colors">
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default KnowledgeCard;
