class CatsController < ApplicationController
  def index
    @cats = Cat.all
  end
end

def show
  @cats = Cat.find(params[:id])
end
